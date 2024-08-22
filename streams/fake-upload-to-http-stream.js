import { Readable } from "node:stream";

class OneToHundredStream extends Readable {
    index = 1;

    _read() {
        const i = this.index++;

        if (i > 5) {
            this.push(null);
        } else {
            const buf = Buffer.from(String(i)); //*buffer nao acc numero
            this.push(buf);
        }
    }
}

fetch("http://localhost:3334", {
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: 'half'
})
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
