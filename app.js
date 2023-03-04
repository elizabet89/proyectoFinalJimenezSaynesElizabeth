let productos=document.getElementById("productos");
let template=document.getElementById("template");
let fragment=document.createDocumentFragment();
let carrito=document.getElementById("carrito")
let carritoIcon=document.getElementById("carrito__icon")
let agregarAlCarritoDeCompras=[];
let mostrarCarritoDeCompras=[];
let carritoContador=document.getElementById("carrito__cont");
let fragment2=document.createDocumentFragment();
let template2=document.getElementById("template2");
let tableBody=document.getElementById("tbody");
let total=document.getElementById("total");
let comprar=document.getElementById("comprar");
let mensajeCarritoVacio=document.getElementById("carrito__mensaje")

carritoIcon.addEventListener("click",()=>{
    carrito.classList.toggle("carrito__mostrar");
});





fetch("./app2.json")
.then((res)=>res.json())
.then((products)=>{

 //============================================================================
     products.forEach(item =>{

      let clone=template.content.cloneNode(true);
          clone.querySelector(".card__img").src=item.img;
          clone.querySelector(".card__codigo").textContent=item.id;
          clone.querySelector(".card__title").textContent=item.nombre;
          clone.querySelector(".card__price").textContent=`$`+item.precio;
          clone.querySelector(".card__btn-buy").dataset.id=item.id;

          fragment.appendChild(clone)
      
     });
     productos.appendChild(fragment);
     
//============================================================================

document.addEventListener("click",(e)=>{
  if(e.target.matches(".card__btn-buy")){
    agregarAlCarrito(e); 
  } else if(e.target.matches(".btn-delete")) {
    eliminar(e)
  } 
});
//============================================================================


let pintarCarrito=()=>{
    tableBody.textContent=""
    mostrarCarritoDeCompras=JSON.parse(localStorage.getItem("productos"));
   
    carritoContador.textContent=JSON.parse(localStorage.getItem("carritoLenght"));
    
    if(mostrarCarritoDeCompras.length===0){
        let table=document.getElementById("table");
        table.classList.add("table__nomostrar");
        total.classList.add("table__nomostrar");
        comprar.classList.add("table__nomostrar");
        mensajeCarritoVacio.classList.remove("table__nomostrar")
      }else{
        table.classList.remove("table__nomostrar");
        total.classList.remove("table__nomostrar");
        comprar.classList.remove("table__nomostrar");
        mensajeCarritoVacio.classList.add("table__nomostrar")
      }
   
    // if( mostrarCarritoDeCompras === null){
    // mostrarCarritoDeCompras=[];
    // }
     mostrarCarritoDeCompras.forEach((elemt)=>{

    let clone2=template2.content.cloneNode(true);
        clone2.querySelector(".codigo").textContent=elemt.id;
        clone2.querySelector(".nombre").textContent=elemt.nombre;
        clone2.querySelector(".cantidad").textContent=elemt.cantidad;
        clone2.querySelector(".costo").textContent=elemt.cantidad*elemt.precio;
        clone2.querySelector(".delete").innerHTML=`<i  class="fa-regular fa-trash-can btn-delete"></i>`
        clone2.querySelector(".btn-delete").dataset.id=elemt.id;
        fragment2.appendChild(clone2);
        })

        tableBody.appendChild(fragment2);

        let totalApagar=mostrarCarritoDeCompras.reduce((acc,current)=>acc+current.cantidad*current.precio,0);
       total.textContent=`Total $`+totalApagar;
      

       if(mostrarCarritoDeCompras.length === 0){
        let table=document.getElementById("table");
        table.classList.add("table__mostrar")
       }

}
pintarCarrito();

//============================================================================

let contadorCarrito=()=>{

 
  let contadr=agregarAlCarritoDeCompras.reduce((acc,current)=>acc+current.cantidad,0)
  carritoContador.textContent=contadr;
   localStorage.setItem("carritoLenght",JSON.stringify(contadr));
    
}

//================================================================

let agregarAlCarrito=(e)=>{
     
     let posicion=products.findIndex((prod)=>prod.id===e.target.dataset.id);
         agregarAlCarritoDeCompras=JSON.parse(localStorage.getItem("productos"))
        if( agregarAlCarritoDeCompras === null){
        agregarAlCarritoDeCompras=[];
        };

     let indice=agregarAlCarritoDeCompras.findIndex((item)=>item.id===e.target.dataset.id);
      
        indice === -1 ? agregarAlCarritoDeCompras.push(products[posicion]):agregarAlCarritoDeCompras[indice].cantidad+=1;
        console.log(agregarAlCarritoDeCompras);
        localStorage.setItem("productos",JSON.stringify(agregarAlCarritoDeCompras))

      

        
        contadorCarrito()
        pintarCarrito()
}


   let eliminar=(e)=>{
    console.log(agregarAlCarritoDeCompras)
    agregarAlCarritoDeCompras=JSON.parse(localStorage.getItem("productos"))
    agregarAlCarritoDeCompras=agregarAlCarritoDeCompras.filter((item)=>{

      if(item.id===e.target.dataset.id){
        if(item.cantidad>0){
            item.cantidad--;
            if(item.cantidad===0)return;
                return item;
        }
        
    }else{return item}
 
    })
    localStorage.setItem("productos",JSON.stringify(agregarAlCarritoDeCompras));
    contadorCarrito();
    pintarCarrito();
    console.log(agregarAlCarritoDeCompras)
   } 




    

})

