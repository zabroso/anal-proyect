import fetch from "node-fetch";
import express from "express";

const app = express();

const sensores = {
    radon: {
        startTs: "1265046352083",
        endTs: "1665043961492"
    },
    multi: {
        startTs : "1265046352083",
        endTs: "1665043961492"
    },
    bcmangee: {
        startTs: "1265046352083",
        endTs: "1665044358966"
    },
    bcmaap: {
        startTs: "1265046352083",
        endTs: "1665044739122"
    },
    radiometro: {
        startTs: "1265046352083",
        endTs: "1665044947549"
    },
    mpgrimm: {
        startTs: "1265046352083",
        endTs: "1665048457821"
    }
}


const obtenerToken = async() => {
    const credenciales= {
        "username":"alumnos@alumnos.org",
        "password":"m7a/s99"
    };
    const url = "http://18.214.103.65:8080/api/auth/login";
    const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(credenciales)
    });
    const json = await resp.json();
    return json.token
}

const obtenerValores = (json) => {
    const newJson = [];
    Object.keys(json).map(key =>{
        const array = json[key];
        for (let index = 0; index < array.length; index++) {
            if(newJson[index] === undefined){
                newJson[index] = [array[index].ts,array[index].value]
            }else{
                newJson[index]= [...newJson[index],array[index].value]
            }
        }
    });
    return newJson;
}

const token = await obtenerToken();

app.get('/radon', async(request, response) => {
    const startTs = request.query.startTs;
    const endTs = request.query.endTs;
    const api_url = `http://18.214.103.65:8080/api/plugins/telemetry/DEVICE/723d0580-452d-11ed-b4b1-1bcb8f5daa77/values/timeseries?keys=Fecha,Radon&startTs=${startTs}&endTs=${endTs}`
    const fetch_response = await fetch(api_url, {
        headers: {"X-Authorization": `Bearer ${token}`}
    });
    const json = await fetch_response.json();
    const valores = obtenerValores(json);
    const json_multi = [];
    response.json(json);

})

app.get('/multi', async (request, response) => {
    const startTs = request.query.startTs;
    const endTs = request.query.endTs;
    const api_url = `http://18.214.103.65:8080/api/plugins/telemetry/DEVICE/101d2fe0-454d-11ed-b4b1-1bcb8f5daa77/values/timeseries?keys=TIMESTAMP,WS,WD,Temp,RH,BP,Depth &startTs=${startTs}&endTs=${endTs}`
    const fetch_response = await fetch(api_url, {
        headers: {"X-Authorization": `Bearer ${token}`}
    });
    const json = await fetch_response.json();
    const valores = obtenerValores(json);
    const json_multi = [];
    valores.forEach(element => {
        const obj = {};
        obj['id']=element[0];
        obj['fecha']=element[1];
        obj['ws']=element[2];
        obj['wd']=element[3];
        obj['temp']=element[4];
        obj['rh']=element[5];
        obj['bp']=element[6];
        json_multi.push(obj);
    });
    response.json(json_multi);
});

app.listen(3001, () =>{
    console.log(sensores);
});