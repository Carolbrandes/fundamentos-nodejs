
//* conseguimos trab com dados antes deles estarem completos. 
// * stream de leitura: process.stdin
//* stream de saida: process.stdout
//* tudo que esta sendo recebido no caso pelo terminal, esta sendo encaminhado (pipe)
//* process.stdin.pipe(process.stdout) 

import { Readable, Transform, Writable } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++

        if (i > 100) {
            this.push(null)
        } else {
            const buf = Buffer.from(String(i)) //*buffer nao acc numero
            this.push(buf)
        }
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, enconding, callback) {
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}


class MultiplyByTenStream extends Writable {
    _write(chunck, enconding, callback) {
        console.log(Number(chunck.toString()) * 10)
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())
