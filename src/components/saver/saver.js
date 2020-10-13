class Saver {
    constructor(mainClass, element) {
        this.mainClass = mainClass || null;
        this.element = element || null;

        this.render();
    }

    downloadFile(blob, name = 'test') {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        window.u = url;
        console.log('url 1', window.u);
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => {
            URL.revokeObjectURL(url);
            console.log('url 2', window.url)
        }, 10000)

    }

    createBlob() {
        const blob = new Blob([this.value], {type: 'text/plain;charset=utf-8'});
        this.downloadFile(blob);
    }

    createForm() {
        const form = document.createElement('form');

        form.classList.add(this.mainClass);

        form.addEventListener('submit', ev => {
            ev.preventDefault();
            this.createBlob();
        });

        return form;
    }

    createTextArea() {
        const textarea = document.createElement('textarea');

        textarea.addEventListener('input', ev => {
            this.value = ev.target.value;
        });

        textarea.addEventListener('change', ev => {
            this.value = ev.target.value;
        });

        return textarea;
    }

    createBtn() {
        const btn = document.createElement('button');
        btn.innerText = 'click';
        btn.style.display = 'block';

        return btn;
    }

    render() {
        const form = this.createForm();
        const textArea = this.createTextArea();
        const btn = this.createBtn();

        form.append(textArea);
        form.append(btn);

        return form;

    }
}

export default Saver