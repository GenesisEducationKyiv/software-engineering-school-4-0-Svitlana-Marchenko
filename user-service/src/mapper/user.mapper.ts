import { User } from '../entity/user.entity';
import { UserDTO } from '../dto/user.dto';

export class UserMapper {
    static toDTO(user: User): UserDTO {
        const userDTO = new UserDTO();
        userDTO.id = user.id;
        userDTO.email = user.email;
        userDTO.subscriptionType = user.subscriptionType;
        return userDTO;
    }

    static toEntity(userDTO: UserDTO): User {
        const user = new User();
        user.id = userDTO.id;
        user.email = userDTO.email;
        user.subscriptionType = userDTO.subscriptionType;
        return user;
    }
}
