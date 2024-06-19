export enum HttpCode {
    OK = 200,
    CREATED = 201,
    NOT_MODIFIED = 304,
    BAD_RQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}
export enum Message{
    SOMETHING_WENT_WRONG = "Something went wrong !",
    NO_DATA_FOUND = "No data is found ",
    CREATE_FAILED = "Create is failed",
    UPDATED_FAILED = "Update is failed !",

    NO_MEMBER_NICK = "No Member with that nick !",
    USED_NICK_PHONE = "You are inserting already used nick or phone",
    WRONG_PASSWORD = "Wrong password, please try again",

}
class Errors extends Error {
    public code: HttpCode;
    public message: Message;

    static standard = {
        code:HttpCode.INTERNAL_SERVER_ERROR,
        message:Message.SOMETHING_WENT_WRONG,
    }

    constructor(statusCode:HttpCode, statusMessage: Message) {
 super();
 this.code = statusCode;
 this.message =statusMessage;

    }

}
export default Errors;