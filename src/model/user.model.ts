import {
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
} from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';

@index({ email: 1 })
@pre<User>('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 12);
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})

export class User {
  @prop()
  name: string;

  @prop({ unique: true, required: true })
  email: string;

  @prop({ required: true, minlength: 1, select: false })
  password: string;

  @prop({ default: 'user' })
  role: string;

  @prop({ default: 'active' })
  status: string;

  @prop({ required: true, default: Date.now() })
  lastLogin: Date;

  async comparePasswords(hashedPassword: string, candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}

const userModel = getModelForClass(User);
export default userModel;

