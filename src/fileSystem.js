const fs = require("fs");

class ManagerUsuarios {
  constructor() {
    this.file = "Usuarios.json";
  }

  existFile() {
    try {
      fs.accessSync(this.file);
      return true;
    } catch (error) {
      return false;
    }
  }

  async readFile(fileName) {
    try {
      const file = await fs.promises.readFile(fileName, 'utf8');
      return JSON.parse(file);
    } catch (error) {
      throw new Error(`Error al leer el archivo ${fileName}: ${error.message}`);
    }
  }

  async writeFile(fileName, data) {
    try {
      await fs.promises.writeFile(fileName, JSON.stringify(data, null, 2));
    } catch (error) {
      throw new Error(`Error al escribir en el archivo ${fileName}: ${error.message}`);
    }
  }

  async crearUsuario(obj) {
    try {
      const existFile = this.existFile();
      let file = existFile ? await this.readFile(this.file) : [];
      file.push(obj);
      await this.writeFile(this.file, file);
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  }

  async consultarUsuarios() {
    try {
      return await this.readFile(this.file);
    } catch (error) {
      throw new Error(`Error al consultar los usuarios: ${error.message}`);
    }
  }
}

(async () => {
  try {
    let test = new ManagerUsuarios();
    await test.crearUsuario({
      nombre: "Gaston 4",
      apellido: "Pardo 4",
      edad: 20,
      curso: "13"
    });
    console.log(await test.consultarUsuarios());
  } catch (error) {
    console.log(error);
  }
})();
