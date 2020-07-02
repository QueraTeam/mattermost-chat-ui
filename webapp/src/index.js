import manifest from './manifest';
import "./style.scss"

class MattermostChatUIPlugin {
    initialize(registry, store) {
        console.info('Hi! Mattermost Chat UI plugin initialized...');
        setInterval(this.detectDarkTheme, 5000);
    }

    detectDarkTheme() {
        const el = document.getElementById('app-content');
        if (el === null)
            return;
        const rgb = getComputedStyle(el).backgroundColor
            .split('(')[1].split(')')[0].split(', ').map(Number);
        const luma = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
        if (luma < 140) {
            document.body.classList.remove('q--light-theme');
            document.body.classList.add('q--dark-theme');
        } else {
            document.body.classList.remove('q--dark-theme');
            document.body.classList.add('q--light-theme');
        }
    }
}

window.registerPlugin(manifest.id, new MattermostChatUIPlugin());