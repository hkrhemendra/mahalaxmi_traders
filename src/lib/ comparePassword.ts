import bcrypt from 'bcryptjs';

export async function comparePassword(password: string, hashPassword: string){
  console.log('Compared Password: ', password, hashPassword)
    return await bcrypt.compareSync(
        password,
        hashPassword,
      );
}