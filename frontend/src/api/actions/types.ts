type Params = { data: FormData; articleId: string; page: string; pageReply: string };
type WithFormData = { data: FormData };
type WithId = { id: string };
type Action<T> = (params: T) => Promise<Response>;

export type ActionCreateComment = Action<Omit<Params, 'pageReply'>>;
export type ActionCreateCommentReply = Action<Params>;
export type ActionUpdateLikesComment = Action<Params>;

export type ActionUpdateUserProfile = Action<WithFormData & WithId>;
export type ActionChangeUserPassword = Action<WithFormData & WithId>;
export type ActionDeleteUserAccount = Action<WithFormData & WithId>;
export type ActionRegisterUser = Action<WithFormData>;
export type ActionLoginUser = Action<WithFormData>;
