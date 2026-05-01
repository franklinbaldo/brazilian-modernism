import re

with open('src/components/Switch.svelte', 'r') as f:
    content = f.read()

content = content.replace('<div class="switch-container"', '<label class="switch-container"')
content = content.replace('</div>\n\n<style>', '</label>\n\n<style>')

with open('src/components/Switch.svelte', 'w') as f:
    f.write(content)
