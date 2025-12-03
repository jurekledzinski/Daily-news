type Params = { data: FormData; articleId: string; page: string };

type Action<T> = (params: T) => Promise<{ message?: string } | Response>;

export type ActionFunctionData = Action<Pick<Params, 'data'>>;
export type ActionCreateComment = Action<Params>;
