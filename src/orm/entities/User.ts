import bcrypt from 'bcryptjs';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({
		unique: true,
	})
	email: string;

	@Column({ select: false })
	password: string;

	@Column()
	@CreateDateColumn()
	created_at: Date;

	@Column()
	@UpdateDateColumn()
	updated_at: Date;

	@Column()
	@DeleteDateColumn()
	deleted_at: Date;

	hashPassword() {
		this.password = bcrypt.hashSync(this.password, 8);
	}

	checkIfPasswordMatch(unencryptedPassword: string) {
		return bcrypt.compareSync(unencryptedPassword, this.password);
	}
}
