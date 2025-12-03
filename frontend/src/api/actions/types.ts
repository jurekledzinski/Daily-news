type Params = { data: FormData; articleId: string; page: string };
type ParamsProfile = { data: FormData; id: string };

type Action<T> = (params: T) => Promise<{ message?: string } | Response>;

export type ActionFunctionData = Action<Pick<Params, 'data'>>;
export type ActionComment = Action<Params>;
export type ActionProfile = Action<ParamsProfile>;
