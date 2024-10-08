document.querySelector('.busca').addEventListener('submit', async (e)=>{
    e.preventDefault();
    let valo = document.querySelector('#searchInput');
    let valor = valo.value;

    if(valor !== ''){
        limpar()
        aviso('carregando...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(valor)}&appid=551204427ae4b3297fc079f1aaa5f8dd&units=metric&lang=pt_br`;
        
        let resulta = await fetch(url);
        let json = await resulta.json();

        if(json.cod === 200){
            infor({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        }   else{

            aviso('não foi possivel encontrar essa cidade')
        }
    }
    valo.value = '';
})
function infor(json){
    
    aviso('');

    document.querySelector('.resultado').style.display = 'block';
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle -90}deg)`
}

function aviso(msm){
    document.querySelector('.aviso').innerHTML = msm;
}

function limpar(){
    aviso('');
    document.querySelector('.resultado').style.display = 'none';
}