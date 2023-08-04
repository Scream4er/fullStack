const { prisma } = require('../prisma/prisma-client');

/**
 *
 * @route GET /api/employees
 * @desc Get all employees
 * @access private
 */

const all = async (req, res) => {
    try {
       const employees = await prisma.employee.findMany();

       res.status(200).json(employees);
    } catch {
        res.status(500).json({message: 'Cant get employees'});
    }
}

/**
 *
 * @route APP /api/employees/add
 * @desc Add new employee
 * @access private
 */

const add = async (req, res) => {
    try {
       const data = req.body;

       if (!data.firstName || !data.lastName || !data.address || !data.age) {
           return res.status(400).json({message: 'All inputs needs to be filled'})
       }

       const employee = await prisma.employee.create({
           data: {
               ...data,
               userId: req.user.id
           }
       });

       res.status(201).json(employee);
    } catch(err) {
       res.status(500).json({message: 'SOmethng goes wrong'})
    }
}

/**
 *
 * @route POST /api/employees/remove/:id
 * @desc Remove employee
 * @access private
 */

const remove = async (req, res) => {
    const { id } = req.body;

    try {
        await prisma.employee.delete({
            where: {
                id
            }
        });

        res.status(204).json({message: 'OK'})
    } catch(err) {
        res.status(500).json({message: 'Cant remove employee'})
    }
}

/**
 *
 * @route PUT /api/employees/edit/:id
 * @desc edit employee
 * @access private
 */

const edit = async (req, res) => {
    const data = req.body;
    const id = data.id;

    try {
        await prisma.employee.update({
            where: {
                id
            },
            data
        })

        res.status(204).json({message: 'OK'})
    } catch (err) {
        res.status(500).json({message: 'Cant edit employee'})
    }
}

/**
 *
 * @route GET /api/employees/:id
 * @desc get employee
 * @access private
 */

const employee = async (req, res) => {
    const { id } = req.params;

    try {

        const employee = await prisma.employee.findUnique({
            where: {
                id
            }
        });

        res.status(200).json(employee)
    } catch (err) {
        res.status(500).json({message: 'Cant get employee'})
    }
}

module.exports = {
    all,
    add,
    remove,
    edit,
    employee
}