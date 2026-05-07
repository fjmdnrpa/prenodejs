// Se obtienen los valores ingresados por linea de comandos, se utiliza spread para args
const [, , metodo, endpoint, ...args] = process.argv;
// Se divide el endpoint en 2 elementos de un array
const partes = endpoint.split("/");
// Se desestructuran los datos en 2 variables
// Si no se ingresa una id se le asigna false para mostrar todos los productos
const [recurso, id = false] = partes;

// Verificaciones inicial. Recurso "products"
if (recurso.toLowerCase() === "products") {
  // Switch principal para el metodo ingresado en el comando
  // Se utiliza toLowerCae para permitir comando en mayusculas y minisculas
  switch (metodo.toLowerCase()) {
    case "get":
      // Si id es false ingresa al listado general
      if (!id) {
        try {
          const response = await fetch("https://fakestoreapi.com/products");
          const data = await response.json();
          console.log("Listado general de productos: ");
          console.log(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
        // Se verfica que el producto exista en la api y se lo muestra
      } else if (parseInt(id) >= 1 && parseInt(id) < 21) {
        try {
          const response = await fetch(
            "https://fakestoreapi.com/products/" + id,
          );
          const data = await response.json();
          console.log(`Producto solicitado ${id}`);
          console.log(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      } else {
        console.log(`El producto "${id}" no esta disponible`);
      }
      break;

    case "post":
      try {
        // Se crea el objeto a partir de los argumentos
        const producto = { title: args[0], price: args[1], category: args[2] };
        const respuesta = await fetch("https://fakestoreapi.com/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(producto),
        });
        const datos = await respuesta.json();
        console.log("Producto agregado: ");
        console.log(datos);
      } catch (error) {
        console.log(error);
      }
      break;

    case "put":
      console.log("El metdo PUT no esta implementado");
      break;

    case "delete":
      //Se verfica que el producto exista en la api y se lo elimina
      if (parseInt(id) >= 1 && parseInt(id) < 21) {
        try {
          const respuesta = await fetch(
            "https://fakestoreapi.com/products/" + id,
            { method: "DELETE" },
          );
          const datos = await respuesta.json();
          console.log("Producto eliminado: ");
          console.log(datos);
        } catch (error) {
          console.log(error);
        }
      } else if (!id) {
        console.log(`Debe ingresar el ID del producto a eliminar`);
      } else {
        console.log(`El producto "${id}" no esta disponible`);
      }
      break;

    default:
      console.log(`El metodo "${metodo}" no esta soportado`);
  }
} else {
  console.log(
    `El recurso "${recurso}" no esta disponible, verifique la sintaxis del commando`,
  );
}
