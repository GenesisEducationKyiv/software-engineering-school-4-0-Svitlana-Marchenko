import sinon from 'sinon'
import userService from '../services/user/user.service'
import { User } from '../entity/user.entity'
import { dataSource } from '../config/dataSource'
import {
   FIRST_EMAIL,
   FIRST_ID,
   SECOND_EMAIL,
   SECOND_ID,
} from './mock/user.const'
import UserAlreadyExistError from '../error/types/userAlreadyExist.error'

describe('UserService', () => {
   let userRepositoryStub: sinon.SinonStubbedInstance<any>

   beforeEach(() => {
      userRepositoryStub = sinon.stub(dataSource.getRepository(User))
   })

   afterEach(() => {
      sinon.restore()
   })

   describe('test subscribeEmail method', () => {
      it('should create a new user if user with given email does not exist', async () => {
         userRepositoryStub.findOne.resolves(null)
         userRepositoryStub.create.returns({ id: FIRST_ID, email: FIRST_EMAIL })
         userRepositoryStub.save.resolves({ id: FIRST_ID, email: FIRST_EMAIL })

         const user = await userService.subscribeEmail(FIRST_EMAIL)

         expect(user.id).toBe(FIRST_ID)
         expect(user.email).toBe(FIRST_EMAIL)
      })

      it('should throw an error if email already exists', async () => {
         userRepositoryStub.findOne.resolves({
            id: FIRST_ID,
            email: FIRST_EMAIL,
         })

         await expect(userService.subscribeEmail(FIRST_EMAIL)).rejects.toThrow(
            UserAlreadyExistError,
         )
      })

      it('should throw an error if saving user fails', async () => {
         userRepositoryStub.findOne.resolves(null)
         userRepositoryStub.create.returns({ id: FIRST_ID, email: FIRST_EMAIL })
         userRepositoryStub.save.rejects(new Error('Database error'))

         await expect(userService.subscribeEmail(FIRST_EMAIL)).rejects.toThrow(
            'Error creating user: Database error',
         )
      })
   })

   describe('Test getAllUsers method', () => {
      it('should return all users', async () => {
         const users = [
            { id: FIRST_ID, email: FIRST_EMAIL },
            { id: SECOND_ID, email: SECOND_EMAIL },
         ]
         userRepositoryStub.find.resolves(users)

         const result = await userService.getAllUsers()

         expect(result).toEqual(users)
      })

      it('should throw an error if fetching users fails', async () => {
         userRepositoryStub.find.rejects(new Error('Database error'))

         await expect(userService.getAllUsers()).rejects.toThrow(
            'Error getting all users email: Database error',
         )
      })
   })
})
