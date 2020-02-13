import * as Yup from 'yup';
import Student from '../models/Student';

class StudentsControllers {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.string().required(),
      height: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ Error: 'Validation fails' });
    }

    const userExist = await Student.findOne({
      where: { email: req.body.email },
    });

    if (userExist) {
      return res.status(401).json({ Error: 'User exist' });
    }

    const user = await Student.create(req.body);
    return res.json(user);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      name: Yup.string(),
      age: Yup.number(),
      weight: Yup.string(),
      height: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ Error: 'Validation fails' });
    }

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ Error: 'User not found' });
    }

    const user = await student.update(req.body);

    return res.json(user);
  }

  async all(req, res) {
    const user = await Student.findAll({});
    return res.json(user);
  }
}

export default new StudentsControllers();
