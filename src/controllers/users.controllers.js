const users = [
    { id:1 , name: "Ana", age: 25},
    { id:2 , name: "Juan", age: 23},
    { id:3 , name: "Maria", age: 20},
    { id:4 , name: "Pedro", age: 26},
]

export const getUsers = (req,res) => {
    res.json(users);
};

export const getUserById = (req,res) => {
    
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).json({
            message: "Usuario no encontrado",
        });
    } 
    res.json(user);
};

export const createUser = (req,res) => {
    
    const { name, age } = req.body;
    if (!name || !age ) {
        return res.status(400).json ({
            message: "Faltan datos obligatorios", 
        })
    }
    const newUser = {
        id: users.length +1,
        name,
        age,
    };
    users.push(newUser);
    res.status(201).json(newUser);
};

export const deleteUser = (req,res) => {
    
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id)
    if (userIndex === -1) {
        return res.status(404).json ({
            message: "Usuario no encontrado",
        });
    }
    const deletedUser = users.splice(userIndex,1);
    res.json({
        message: "Usuario eliminado",
        user: deletedUser[0],
    });
};
