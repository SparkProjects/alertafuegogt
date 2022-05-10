function dos_fechas(fecha1,fecha2){f1=fecha1.getTime();f2=fecha2.getTime();var difference_ms=f1-f2;difference_ms=difference_ms/1e3;var seconds=Math.floor(difference_ms%60);difference_ms=difference_ms/60;var minutes=Math.floor(difference_ms%60);difference_ms=difference_ms/60;var hours=Math.floor(difference_ms%24);var days=Math.floor(difference_ms/24);return days+" d, "+hours+" h, "+minutes+" min, "+seconds+" s"}function img_reportes(){var inicial="2019-08";var a_inicial=inicial.split("-")[0];var m_inicial=inicial.split("-")[1];var f_final=new Date;if(f_final.getMonth()==0){var a_final=f_final.getFullYear()-1;var m_final="12"}else{var a_final=f_final.getFullYear();var m_final=""+f_final.getMonth()}if(m_final.length<2)m_final="0"+m_final;f_final=a_final+"-"+m_final;console.log(inicial);var i=0;while((new Intl.Collator).compare(inicial,f_final)!=0){console.log((new Intl.Collator).compare(inicial,f_final));m_inicial=parseInt(m_inicial)+1;if(m_inicial>12){a_inicial=parseInt(a_inicial)+1;m_inicial=1;inicial=a_inicial.toString()+"-0"+m_inicial.toString()}else{if(m_inicial.toString().length<2){inicial=a_inicial.toString()+"-0"+m_inicial.toString()}else{inicial=a_inicial.toString()+"-"+m_inicial.toString()}}console.log(inicial);var bloque='<div class="column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen">';bloque+='<div class="card">';bloque+='<div class="card-image reporte_img">';bloque+='<figure class="image has-ratio">';bloque+='<img src="img/reportes_mensuales/'+inicial+'-img.png" alt="Placeholder image">';bloque+="</figure>";bloque+="</div>";bloque+='<div class="content has-text-centered">';bloque+='<p class="subtitle is-5">Reporte Incendios</br>'+inicial+"</p>";bloque+="</div>";bloque+="</div>";bloque+="</div>";$("#reportes").append(bloque)}}function revisar_klaro(){if(document.cookie.split(";").some(item=>item.trim().startsWith("klaro_SparkGT="))){return true}else{return false}}$(document).ready(function(){var tiempo_de_descarga=15;$(".navbar-burger").click(function(){$(".navbar-burger").toggleClass("is-active");$(".navbar-menu").toggleClass("is-active")});$(".modal-close").click(function(){$(".modal").toggleClass("is-active");$("html").toggleClass("is-clipped")});$(".buttons > a").click(function(){$(".navbar-burger").toggleClass("is-active");$(".navbar-menu").toggleClass("is-active")});if($("#map").length){var map=L.map("map").setView([15.696016409022414,-90.3601568359087],7);var mapa=L.tileLayer("https://raw.githubusercontent.com/SparkProjects/guatemala-tiles/master/tiles/{z}/{x}/{y}.png",{"attribution":'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',"detectRetina":true,"maxZoom":14,"minZoom":7,"errorTileUrl":"https://raw.githubusercontent.com/SparkProjects/guatemala-tiles/master/tiles/fallbacktile.png"}).addTo(map);var mapa_incendios=new PruneClusterForLeaflet;Papa.parse("datosf_sim_web.csv",{"header":true,"download":true,"skipEmptyLines":false,"step":function(row){var f_a=new Date;if(row.data["tipo_suelo"]!==undefined){if((row.data["tipo_suelo"].trim()==="Arboles dispersos"||row.data["tipo_suelo"].trim()==="Bosque"||row.data["tipo_suelo"].trim()==="Cuerpos de agua"||row.data["tipo_suelo"].trim()==="Espacios abiertos, poca vegetacion"||row.data["tipo_suelo"].trim()==="Pastizales"||row.data["tipo_suelo"].trim()==="Sabanas"||row.data["tipo_suelo"].trim()==="Sin informacion"||row.data["tipo_suelo"].trim()==="Urbano"||row.data["tipo_suelo"].trim()==="Vegetaci\xf3n arbistiva baja (guamil-matorral)"||row.data["tipo_suelo"].trim()==="Zonas humedas")&&row.data["visible"]==1&&row.data["volcan"]==0){var marker=new PruneCluster.Marker(parseFloat(row.data["latitude"]),parseFloat(row.data["longitude"]));marker.data.icon=L.icon({"iconUrl":"static/img/incendios.png","iconRetinaUrl":"static/img/incendios.png","shadowUrl":"static/img/sombra.png","shadowRetinaUrl":"static/img/sombra.png","iconSize":[25,33],"shadowSize":[25,25],"iconAncor":[0,0],"shadowAnchor":[2,7],"popupAnchor":[0,-10]});var f_d=new Date(row.data["fecha_utc"]);var diif_f=dos_fechas(f_a,f_d);marker.data.popup="<center><b>INCENDIO DETECTADO</b></center> <br>"+"<b>Latitud , Longitud</b> <br>"+row.data["latitude"].substr(0,8)+" , "+row.data["longitude"].substr(0,9)+"<br>"+"<b>Departamento</b> <br>"+row.data["departamento"]+"<br>"+"<b>Municipio</b> <br>"+row.data["municipio"]+"<br>"+"<b>Fecha de detecci\xf3n</b> <br>"+f_d.toLocaleString()+"<br>"+"<b>Tiempo activo</b> <br>"+diif_f+"<br>"+"<b>Tipo de suelo</b> <br>"+row.data["tipo_suelo"];mapa_incendios.RegisterMarker(marker);var marker2=new PruneCluster.Marker(parseFloat(row.data["lugarp_latitud"]),parseFloat(row.data["lugarp_longitud"]));marker2.data.icon=L.icon({"iconUrl":"static/img/poblados.png","iconRetinaUrl":"static/img/poblados.png","shadowUrl":"static/img/sombra.png","shadowRetinaUrl":"static/img/sombra.png","iconSize":[25,33],"shadowSize":[25,25],"iconAncor":[0,0],"shadowAnchor":[2,7],"popupAnchor":[0,-10]});marker2.data.popup="<center><b>LUGAR POBLADO</b></center> <br>"+"<b>Latitud , Longitud</b> <br>"+row.data["lugarp_latitud"].substr(0,8)+" , "+row.data["lugarp_longitud"].substr(0,9)+"<br>"+"<b>Departamento</b> <br>"+row.data["lugarp_departamento"]+"<br>"+"<b>Municipio</b> <br>"+row.data["lugarp_municipio"]+"<br>"+"<b>Sitio</b> <br>"+row.data["lugarp_categoria"]+" "+row.data["lugarp_lugar"];mapa_incendios.RegisterMarker(marker2)}}},"complete":function(){map.addLayer(mapa_incendios)}})}setTimeout(function intro(){$("#load-in").removeClass("is-active")},2e3);img_reportes();$(".reporte_img").click(function(){var img=$(this).find(".image img");var img_type=img.attr("src");console.log(img);console.log(img_type);$("#vista-previa").attr("src",img_type);$(".modal").toggleClass("is-active");$("html").toggleClass("is-clipped")})});