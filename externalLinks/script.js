document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const container = document.getElementById('container'),
          loader = document.createElement('div');
    
          loader.classList.add('loader');

    const getData = (link) => {
        return fetch(link)
            .then((response) => {
                if(response.status !== 200) {
                    throw new Error('network status not 200');
                }
                return response.json();
            })
            .then((response) => {
                return response[Object.keys(response)[0]];
            })
            .then(addBlock)
            .then((block) => {
                if(block.tagName !== 'VIDEO' && block.src.slice(-3) !== 'gif') {
                    block.addEventListener('load', (evt) => {
                        document.body.lastChild.remove();
                        container.style.display = 'block';
                    });
                    container.appendChild(block);
                } else {
                    document.body.lastChild.remove();
                    container.appendChild(block);
                    container.style.display = 'block';
                }
            })
            .catch((error) => console.error(error));
    };

    const addBlock = (link) => {
        if(container.firstChild) {
            container.firstChild.remove();
        }
        
        let block;
        if(link.slice(-3) !== 'mp4' && link.slice(-4) !== 'webm') {
            block = document.createElement('img');
            block.src = link;
        } else {
            block = document.createElement('video');
            block.setAttribute('controls', 'controls');
            block.setAttribute('autoplay', '');
            block.innerHTML = `<source src="${link}">`;
        }
        return block;
    };

    document.addEventListener('click', (evt) => {
        evt.preventDefault();
        
        if(evt.target.matches('a')) {
            container.style.display = 'none';
            document.body.appendChild(loader);
            getData(evt.target.dataset.src);
        } 
    });

});