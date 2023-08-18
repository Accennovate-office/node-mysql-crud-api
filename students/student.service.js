const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    // console.log(db);
    // return await db.Student.findAll();
    try {
        // await sequelize.sync(); // Sync models with the database
    
        const students = await db.Student.findAll(); // Retrieve all records
    
        console.log(students); // Output retrieved records
        return students;
      } catch (error) {
        console.error("Error:", error);
        return error;
      }
}

async function getById(id) {
    return await getStudent(id);
}

async function create(params) {
    // validate
    // if (await db.Student.findOne({ where: { email: params.email } })) {
    //     throw 'Email "' + params.email + '" is already registered';
    // }

    const student = new db.Student(params);
    
    // hash password
    // student.passwordHash = await bcrypt.hash(params.password, 10);

    // save student
    await student.save();
}

async function update(id, params) {
    const student = await getStudent(id);

    // validate
    // const emailChanged = params.email && student.email !== params.email;
    // if (emailChanged && await db.Student.findOne({ where: { email: params.email } })) {
    //     throw 'Email "' + params.email + '" is already registered';
    // }

    // hash password if it was entered
    // if (params.password) {
    //     params.passwordHash = await bcrypt.hash(params.password, 10);
    // }

    // copy params to student and save
    Object.assign(student, params);
    await student.save();
}

async function _delete(id) {
    const student = await getStudent(id);
    await student.destroy();
}

// helper functions

async function getStudent(id) {
    const student = await db.Student.findByPk(id);
    if (!student) throw 'Student not found';
    return student;
}
