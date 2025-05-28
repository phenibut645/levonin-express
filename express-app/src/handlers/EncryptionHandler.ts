
import bcrypt from 'bcrypt';


export class EncryptionHandler {
    static async hashPassword(plainPassword: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        return hashedPassword;
      };

    static async comparePasswords(plainPassword: string, storedHashedPassword: string): Promise<boolean>{
        return await bcrypt.compare(plainPassword, storedHashedPassword);
    }
}