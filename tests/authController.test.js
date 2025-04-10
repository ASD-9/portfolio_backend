const authController = require("../src/authController");
const User = require("../src/userModel");
const bcrypt = require("bcrypt");

jest.mock("../src/userModel");
jest.mock("bcrypt");

const mockUser = {
  username: "user",
  password: "hashedPassword",
  companyName: "Company",
  description: "Description",
  reason: "Reason",
};

describe("authController", () => {
  let req, res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    beforeEach(() => {
      req = {
        body: {
          username: "user",
          password: "password",
        },
      };
    });

    it("should return user infos with status 200", async () => {
      User.findOne.mockResolvedValue({
        ...mockUser,
        toObject: jest.fn().mockReturnValue(mockUser),
      });
      bcrypt.compare.mockResolvedValue(true);

      await authController.login(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Connexion réussie", data: mockUser });
    });

    it("should return status 401 if user not found", async () => {
      User.findOne.mockResolvedValue(null);

      await authController.login(req, res);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Nom d'utilisateur ou mot de passe incorrect" });
    });

    it("should return status 401 if password is incorrect", async () => {
      User.findOne.mockResolvedValue({
        ...mockUser,
        toObject: jest.fn().mockReturnValue(mockUser),
      });
      bcrypt.compare.mockResolvedValue(false);

      await authController.login(req, res);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Nom d'utilisateur ou mot de passe incorrect" });
    });

    it("should return status 500 if an error occurs", async () => {
      User.findOne.mockRejectedValue(new Error("Database error"));

      await authController.login(req, res);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Erreur serveur", error: "Database error" });
    });
  });
});
