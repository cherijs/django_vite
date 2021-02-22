import json
import os
import os.path
from os import path

import jinja2.ext
from django import template
from django.templatetags.static import static
from django.utils.safestring import mark_safe

register = template.Library()


class ViteExtension(jinja2.ext.Extension):
    def parse(self, parser):
        raise NotImplementedError()

    def __init__(self, environment):
        super().__init__(environment)
        environment.globals["render_vite"] = lambda *a, **k: jinja2.Markup(render_vite(*a, **k))


@register.simple_tag
def render_vite(manifest_dir="vite/dist", dev_path="https://foxyping.dev.pixels.lv:3333"):
    """
    add to settings vite.extension.ViteExtension

    TEMPLATES = [
    {
        'BACKEND': 'django_jinja.backend.Jinja2',
        "DIRS": [os.path.join(BASE_DIR, "jinja2")],
        'APP_DIRS': True,
        'OPTIONS': {
            "match_extension": ".html",
            "match_regex": r"^(?!admin/).*",
            "app_dirname": "jinja2",
            'auto_reload': True,
            'environment': 'jinja.environment',
            "extensions": [
                "vite.extension.ViteExtension",
            ],
        }
    }
    ]


    add to base.html
    {{ render_vite("vite/static", "https://foxyping.dev.pixels.lv:3333") }}

    :rtype: str
    """
    manifest = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        manifest_dir,
        "manifest.json",
    )

    tags = []
    static_assets = {}

    if path.exists(manifest):
        with open(manifest) as json_file:
            assets = json.load(json_file)
            for chunk_name, asset in assets.items():
                file = static(asset['file'])
                is_entry = asset.get('isEntry')

                css_bundle = None
                if asset.get('css'):
                    css_bundle = asset.get('css')

                static_assets.update({
                    chunk_name: file
                })

                if is_entry:
                    tags.append(f'<script type="module" crossorigin src="{file}"></script>')
                else:
                    tags.append(f'<link rel="modulepreload" href="{file}">')

                if css_bundle:
                    for css in css_bundle:
                        tags.append(f'<link type="text/css" href="{static(css)}" rel="stylesheet"/>')
    else:
        tags.append(f'<script type="module" src="{dev_path}/@vite/client"></script>')
        tags.append(f'<script type="module" src="{dev_path}/src/main.js"></script>')

    return mark_safe('\n'.join(tags))
