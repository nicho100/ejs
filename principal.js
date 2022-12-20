const express=require('express')
const app= express()
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.set('views', './views')
app.set('view engine', 'ejs')

class contenedor{
    constructor(){
        this.productos=[]
        this.id=1    
    }
    save(object){
        //traer el contenido del archivo y preguntar si tiene algo,si no se pone objet id en 1
        //si hay contenido se recorre y se guarda el id del ultimo y se le suma uno y al objeto.id se le asigna lo guardad
            
        object.id=this.id
        this.productos.push(object)
        this.id++
        return this.id
        
    }
    getbyid(number){
        let resultado=null
              let bandera=0
              for(let i = 0;i <this.productos.length;i++){
              if (info[i].id==number){
                resultado = this.productos[i]
                bandera=1
                }} 
              if (bandera===0){
                resultado=null      
              }
              
           return resultado
    }//funciona
    getAll(){
      return this.productos
    }//funciona
    deleteById(number){
         let bandera=-1
        for(let i = 0;i <this.productos.length;i++){
             if (this.productos[i].id===number){
                this.productos.splice(i,1)
                bandera=1
                }
         }if (bandera===-1){
            console.log("el elemento no se encuentra en el array")
            }
    }//funciona
    deleteAll(){
    this.productos=[]
    }//funciona

}


const apiClass= new contenedor
const produc= apiClass.getAll()


app.get('/productos', (req,res)=>{
res.render('form.ejs',{produc})
})

app.post('/productos',(req, res)=>{
    //console.log(req.body)
    apiClass.save(req.body)
    let productos=apiClass.getAll()
    console.log(productos)
    res.redirect('/productos')
})
app.listen(8080,(req,res)=>{
    console.log("funciona")
})