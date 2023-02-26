import axios from "axios";

var benimIP;

// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
  await axios({
    method: "get",
    url: "https://apis.ergineer.com/ipadresim",
  })
    .then(function (response) {
      return response.data;
    })
    .then(function (a) {
      benimIP = a;
    });
}
// ------------ değiştirmeyin --------------

/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	 https://apis.ergineer.com/ipgeoapi/46.2.236.122
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim --> 46.2.236.122
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/

//kodlar buraya gelecek

const dummyData = {
  sorgu: "46.2.236.122",
  durum: "OK",
  kıta: "Asia",
  ülke: "Turkey",
  ülkeKodu: "TR",
  ülkebayrağı: "https://apis.ergineer.com/ulkebayraklari/TR",
  bölge: "34",
  bölgeAdı: "Istanbul",
  şehir: "Istanbul",
  zip: "34440",
  enlem: 41.03009999999999735109668108634650707244873046875,
  boylam: 28.96509999999999962483343551866710186004638671875,
  saatdilimi: "Europe/Istanbul",
  parabirimi: "TRY",
  isp: "Vodafone Net DSL - GAYRETTEPE",
  organizasyon: "Vodafone Net Iletisim Hizmetleri A.S.",
  as: "AS8386 VODAFONE NET ILETISIM HIZMETLERI ANONIM SIRKETI",
};

const cards = document.querySelector(".cards");

function cardCreator(obj) {
  const card = document.createElement("div");
  //   card.classList.add("card");
  card.setAttribute("class", "card");

  const ulkebayragi = document.createElement("img");
  ulkebayragi.src = obj.ülkebayrağı;

  const cardInfo = document.createElement("div");
  //   cardInfo.classList.add("card-info");
  cardInfo.setAttribute("class", "card-info");

  const sorgu = document.createElement("h3");
  sorgu.textContent = obj.sorgu;
  //   sorgu.classList.add("ip");
  sorgu.setAttribute("class", "ip");

  const ulke = document.createElement("p");
  ulke.textContent = obj.ülke + " (" + obj.ülkeKodu + ")";
  //   ulke.classList.add("ulke");
  ulke.setAttribute("class", "ulke");

  const satır1 = document.createElement("p");
  satır1.textContent = "Enlem: " + obj.enlem + " Boylam: " + obj.boylam;

  const satır2 = document.createElement("p");
  satır2.textContent = "Şehir: " + obj.şehir;

  const satır3 = document.createElement("p");
  satır3.textContent = "Saat dilimi: " + obj.saatdilimi;

  const satır4 = document.createElement("p");
  satır4.textContent = "Para birimi: " + obj.parabirimi;

  const satır5 = document.createElement("p");
  satır5.textContent = "ISP: " + obj.isp;

  card.appendChild(ulkebayragi);
  card.appendChild(cardInfo);
  cardInfo.appendChild(sorgu);
  cardInfo.appendChild(ulke);
  cardInfo.appendChild(satır1);
  cardInfo.appendChild(satır2);
  cardInfo.appendChild(satır3);
  cardInfo.appendChild(satır4);
  cardInfo.appendChild(satır5);
  return card;
}

//!axios kullanmadan
// cards.appendChild(cardCreator(response.data));

//!axios kullanarak url statik
// function axiosFonk() {
//   axios
//     .get(" https://apis.ergineer.com/ipgeoapi/46.2.236.122")
//     .then((response) => {
//       cards.appendChild(cardCreator(response.data));
//     });
// }

// axiosFonk();

//!axios kullanarak url i parametre olarak vererek
// function axiosFonk2(ip) {
//   axios.get(" https://apis.ergineer.com/ipgeoapi/" + ip).then((response) => {
//     cards.appendChild(cardCreator(response.data));
//   });
// }

// axiosFonk2("46.2.236.122");

async function axiosFonk3() {
  //!await demezsen çalışmıyor ipadresini alana kadar bekle dememiz gerek
  await ipAdresimiAl();
  await axios
    .get(" https://apis.ergineer.com/ipgeoapi/" + benimIP)
    .then((response) => {
      console.log(benimIP);
      cards.appendChild(cardCreator(response.data));
    });
}

axiosFonk3();
