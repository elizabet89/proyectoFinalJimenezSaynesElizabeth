
let articulos=document.getElementById("articulos");
let template=document.getElementById("template");
let fragment=document.createDocumentFragment();
let fragment2=document.createDocumentFragment();
let template2=document.getElementById("template2");
let carrito=document.getElementById("carrito");
let vaciarCarrito=document.querySelector(".vaciar__carrito");
let total=document.querySelector(".total")
let comprar=document.querySelector(".comprar");
let carritoVacio=document.querySelector(".carrito__vacio")
let mostrarCompras=[];
let carritoDeCompras=[];
let modal=document.getElementById("section-modal")
let icon=document.getElementById("icon")
icon.addEventListener("click",()=>{
modal.classList.toggle("ocultar__modal") 

})

window.addEventListener("DOMContentLoaded",(e)=>{
  // carritoDeCompras=JSON.parse(localStorage.getItem("productos"));

  carrito.textContent="";
              
  mostrarCompras=JSON.parse(localStorage.getItem("productos"));
   

  mostrarCompras.forEach((elemento)=>{

  let clone=template2.content.cloneNode(true) 
      clone.querySelector(".title").textContent=elemento.nombre;
      clone.querySelector(".cant").textContent=elemento.cantidad;
      clone.querySelector(".total").textContent=elemento.precio*elemento.cantidad;
      clone.querySelector(".quitar").dataset.id=elemento.id;
      clone.querySelector(".agregar").dataset.id=elemento.id;

     fragment2.appendChild(clone)
    })
    carrito.appendChild(fragment2);
    const costo =mostrarCompras.reduce((acc,current)=>acc+current.cantidad*current.precio,0);
    total.textContent=`Total $`+costo;

    
    vaciarCarrito.classList.remove("vaciar__carrito");
    comprar.classList.remove("comprar");
    carritoVacio.classList.add("vacio")

 })

fetch("./app2.json")
.then((res)=>res.json())
.then((productos)=>{

    productos.forEach((item)=>{
    let clone=template.content.cloneNode(true);
    clone.querySelector(".card__img").src=item.img;
    clone.querySelector(".codigo").textContent=item.id;
    clone.querySelector(".nombre").textContent=item.nombre;
    clone.querySelector(".precio").textContent=`$`+item.precio;
    clone.querySelector(".agregar").dataset.id=item.id;

    fragment.appendChild(clone);

   })
   articulos.appendChild(fragment);

  

//==========================================================

      document.addEventListener("click",(e)=>{
 
        if(e.target.matches(".agregar")){
          agregarAlCarrito(e);
        }else if(e.target.matches(".quitar")){
          quitar(e)
        }else if(e.target.matches(".limpiar")){
          limpiarCarrito(e)
        }
    
      });

    
//============================================================
          

          let pintarCarrito=(e)=>{
      
              carrito.textContent="";
              
              mostrarCompras=JSON.parse(localStorage.getItem("productos"));
               

              mostrarCompras.forEach((elemento)=>{
 
              let clone=template2.content.cloneNode(true) 
                  clone.querySelector(".title").textContent=elemento.nombre;
                  clone.querySelector(".cant").textContent=elemento.cantidad;
                  clone.querySelector(".total").textContent=elemento.precio*elemento.cantidad;
                  clone.querySelector(".quitar").dataset.id=elemento.id;
                  clone.querySelector(".agregar").dataset.id=elemento.id;
          
                 fragment2.appendChild(clone)
                })
                carrito.appendChild(fragment2);
                const costo =mostrarCompras.reduce((acc,current)=>acc+current.cantidad*current.precio,0);
                total.textContent=`Total $`+costo;

                
                vaciarCarrito.classList.remove("vaciar__carrito");
                comprar.classList.remove("comprar");
                carritoVacio.classList.add("vacio")
          
          
            }
   
//=============================================================
  
          let agregarAlCarrito=(e)=>{

             let posicion=productos.findIndex((item)=>item.id === e.target.dataset.id);
             let indice=carritoDeCompras.findIndex((elem)=>elem.id === e.target.dataset.id )
             indice === -1 ? carritoDeCompras.push(productos[posicion]):  carritoDeCompras[indice].cantidad+=1;
             localStorage.setItem("productos",JSON.stringify(carritoDeCompras));
     
            pintarCarrito(e);

            }
          let limpiarCarrito=()=>{
              carrito.textContent="";
              carritoDeCompras.splice(0,carritoDeCompras.length);
              total.textContent="";
              console.log(carritoDeCompras)
              localStorage.setItem("productos",JSON.stringify(carritoDeCompras));
             
              comprar.classList.add("comprar");
              carritoVacio.classList.remove("vacio")
              vaciarCarrito.classList.add("vaciar__carrito");
            }
          

          let quitar=(e)=>{
    
          carritoDeCompras=carritoDeCompras.filter(item=>{
              if(item.id===e.target.dataset.id){
                  if(item.cantidad>0){
                      item.cantidad--;
                      if(item.cantidad===0)return;
                          return item;
                  }
                  
              }else{return item}
          });
           
          localStorage.setItem("productos",JSON.stringify(carritoDeCompras));
          pintarCarrito(e);
                if(carritoDeCompras.length ===0){
                total.textContent=""; 
                comprar.classList.add("comprar");
                carritoVacio.classList.remove("vacio")
                vaciarCarrito.classList.add("vaciar__carrito");
            
          }
    
            }
        

           comprar.addEventListener("click",()=>{
          carrito.textContent="";
          carritoDeCompras.splice(0,carritoDeCompras.length);
          total.textContent="";
          localStorage.setItem("productos",JSON.stringify(carritoDeCompras));
         
            comprar.classList.add("comprar");
            carritoVacio.classList.remove("vacio")
            vaciarCarrito.classList.add("vaciar__carrito");
            swal("Su compra se realizo", "Exitosamente", "success");
           })
           
      })