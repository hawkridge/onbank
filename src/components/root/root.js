import { isDomElement } from '../../utils/utils'

class Root {
    constructor(mainClass = null, target = null) {
        this.mainClass = mainClass;
        this.target = target;

        this.render();
    }

    createBody() {
        const btn = document.createElement('button');
        btn.innerText = 'Click';

        const listener = ev => {
            fetch('api/img')
                .then(response => response.json())
                .then(response => {
                    console.log('success', response)
                })
                .catch(err => {
                    console.log('success', err)
                })
                .finally(() => {
                    console.log('finally')
                })
        } ;

        btn.addEventListener('click', listener);

        return btn
    }

    render() {
        if (isDomElement(this.target)) {
            const body = this.createBody();

            this.target.append(body);
        }
    }
}

export default Root