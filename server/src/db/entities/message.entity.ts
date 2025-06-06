import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('mensagens')
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  conteudo!: string;

  @CreateDateColumn({ type: 'timestamp' })
  criadoEm!: Date;
}
