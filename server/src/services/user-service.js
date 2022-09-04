const { UserRepository } = require("../database");
const {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
  createEdgeNGrams,
} = require("../utils");
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../utils/app-errors");

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async SignIn(userInputs) {
    const { email, password } = userInputs;

    try {
      const existingUser = await this.repository.FindUserByEmail({ email });

      if (existingUser) {
        const validPassword = await ValidatePassword(
          password,
          existingUser.password,
          existingUser.salt
        );

        if (validPassword) {
          const token = await GenerateSignature({
            email: existingUser.email,
            _id: existingUser._id,
          });
          return FormateData({ id: existingUser._id, token });
        } else {
          throw new APIError(
            "NOT FOUND",
            STATUS_CODES.NOT_FOUND,
            "Email sau parola gresite.",
            true
          );
        }
      } else {
        throw new APIError(
          "NOT FOUND",
          STATUS_CODES.NOT_FOUND,
          "Adresa de email nu este inregistrata",
          true
        );
      }

      return FormateData(null);
    } catch (error) {
      throw new APIError("Eroare la autentificare", error);
    }
  }

  async SignUp(userInputs) {
    const {
      firstname,
      lastname,
      email,
      password,
      faculty,
      department,
      uniyear,
      group,
      orar,
      professor,
      administrator,
    } = userInputs;

    var searchfield = await createEdgeNGrams(firstname + " " + lastname);

    const existingUser = await this.repository.FindUserByEmail({ email });
    if (existingUser) {
      throw new APIError(
        "CONFLICT ERROR",
        STATUS_CODES.CONFLICT,
        "Adresa de email este deja folosita.",
        true
      );
    }

    try {
      let salt = await GenerateSalt();

      let userPassword = await GeneratePassword(password, salt);

      const newUser = await this.repository.CreateUser({
        firstname,
        lastname,
        email,
        password: userPassword,
        faculty,
        department,
        uniyear,
        group,
        orar,
        professor,
        administrator,
        searchfield,
        salt,
      });

      const token = await GenerateSignature({ email: email, _id: newUser._id });

      return FormateData({ id: newUser._id, token });
    } catch (error) {
      throw new APIError("Error while signing up", error);
    }
  }

  async DeleteUser(id) {
    if (id == null) return;
    try {
      const result = await this.repository.DeleteUser(id);
      return FormateData(result);
    } catch (error) {
      throw new APIError("Data not found", error);
    }
  }

  async GetUser(id) {
    if (id == null) return;
    try {
      const existingUser = await this.repository.FindUserById(id);
      return FormateData(existingUser);
    } catch (error) {
      throw new APIError("Data not found", error);
    }
  }

  async UpdateUser(id, userInputs) {
    const { firstname, lastname } = userInputs;

    var searchfield = await createEdgeNGrams(firstname + " " + lastname);
    var inputs = userInputs;
    inputs.searchfield = searchfield;

    try {
      const result = await this.repository.UpdateUser(id, userInputs);

      return FormateData({ result });
    } catch (error) {
      throw new APIError("Data not found", error);
    }
  }

  async GetProfile(id) {
    try {
      const existingUser = await this.repository.FindUserById(id);
      return FormateData(existingUser);
    } catch (error) {
      throw new APIError("Data not found", error);
    }
  }

  async GetUserOrar(id) {
    try {
      const orar = await this.repository.GetOrarByUserId(id);

      return FormateData(orar);
    } catch (error) {
      throw new APIError("Data not found", error);
    }
  }

  async GetUserAppointments(id) {
    try {
      const orar = await this.repository.GetAppointmentsByUserId({ id });

      return FormateData(orar);
    } catch (error) {
      throw new APIError("Data not found", error);
    }
  }

  async FindUsers(searchPhrase) {
    try {
      const users = await this.repository.FindUsers(searchPhrase);

      return FormateData(users);
    } catch (error) {
      throw new APIError("Data not found", error);
    }
  }

  async GetAllUsers() {
    try {
      const users = await this.repository.GetAllUsers();

      return FormateData(users);
    } catch (error) {
      throw new APIError("Data not found", error);
    }
  }

  async SearchProfessors(searchPhrase) {
    try {
      const users = await this.repository.FindProfessors(searchPhrase);

      return FormateData(users);
    } catch (error) {
      throw new APIError("Data not found", error);
    }
  }

  async AddUserToGroup(userInputs) {
    const { user_id, group_id } = userInputs;

    try {
      const newUser = await this.repository.AddUserToGroup({
        user_id,
        group_id,
      });

      return FormateData({ id: newUser._id, group_id });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserService;
