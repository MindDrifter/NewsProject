/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Image: { input: any; output: any; }
};

export type Author = {
  __typename?: 'Author';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  NewsId: Scalars['Int']['output'];
  authorId: Scalars['String']['output'];
  authorImage: Scalars['String']['output'];
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type Group = {
  __typename?: 'Group';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateNews?: Maybe<ResponseMessage>;
  CreateUser?: Maybe<ResponseMessageWithToken>;
};


export type MutationCreateNewsArgs = {
  news?: InputMaybe<NewsInput>;
};


export type MutationCreateUserArgs = {
  user?: InputMaybe<UserInput>;
};

export type News = {
  __typename?: 'News';
  author?: Maybe<Scalars['String']['output']>;
  authorId?: Maybe<Scalars['Int']['output']>;
  authorImage?: Maybe<Scalars['String']['output']>;
  commentsId?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  content?: Maybe<Scalars['String']['output']>;
  group?: Maybe<Scalars['String']['output']>;
  groupId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  likes: Scalars['Int']['output'];
  rating: Scalars['Float']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type NewsInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  authorId?: InputMaybe<Scalars['Int']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  group?: InputMaybe<Scalars['String']['input']>;
  groupId?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  AllNews?: Maybe<Array<Maybe<News>>>;
  AllNewsByRating?: Maybe<Array<Maybe<News>>>;
  NewsById?: Maybe<News>;
  UploadImage?: Maybe<Scalars['Image']['output']>;
  UserInformation?: Maybe<Author>;
};


export type QueryAllNewsByRatingArgs = {
  sortType: SortType;
};


export type QueryNewsByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUploadImageArgs = {
  id?: InputMaybe<Scalars['Image']['input']>;
};

export type ResponseMessage = {
  __typename?: 'ResponseMessage';
  message: Scalars['String']['output'];
  status: Scalars['Int']['output'];
};

export type ResponseMessageWithToken = {
  __typename?: 'ResponseMessageWithToken';
  accessToken: Scalars['String']['output'];
  message: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  status: Scalars['Int']['output'];
};

export enum SortType {
  Asc = 'asc',
  Desc = 'desc'
}

export type UserInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type QueryQueryVariables = Exact<{
  skipAllNews: Scalars['Boolean']['input'];
  sortType: SortType;
  skipAllNewsByRating: Scalars['Boolean']['input'];
}>;


export type QueryQuery = { __typename?: 'Query', AllNews?: Array<{ __typename?: 'News', id: string, group?: string | null, author?: string | null, authorImage?: string | null, title?: string | null, image?: string | null, content?: string | null, commentsId?: Array<number | null> | null, likes: number } | null> | null, AllNewsByRating?: Array<{ __typename?: 'News', id: string, group?: string | null, author?: string | null, authorImage?: string | null, title?: string | null, image?: string | null, content?: string | null, commentsId?: Array<number | null> | null, likes: number } | null> | null };

export type AllNewsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllNewsQuery = { __typename?: 'Query', AllNews?: Array<{ __typename?: 'News', id: string, group?: string | null, author?: string | null, authorImage?: string | null, title?: string | null, image?: string | null, content?: string | null, commentsId?: Array<number | null> | null, likes: number } | null> | null };

export type CreateUserMutationVariables = Exact<{
  user?: InputMaybe<UserInput>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', CreateUser?: { __typename?: 'ResponseMessageWithToken', message: string, accessToken: string, refreshToken: string } | null };

export type UserInformationQueryVariables = Exact<{ [key: string]: never; }>;


export type UserInformationQuery = { __typename?: 'Query', UserInformation?: { __typename?: 'Author', name: string } | null };


export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skipAllNews"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SortType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skipAllNewsByRating"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AllNews"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skipAllNews"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"group"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"authorImage"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"commentsId"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}}]}},{"kind":"Field","name":{"kind":"Name","value":"AllNewsByRating"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sortType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortType"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skipAllNewsByRating"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"group"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"authorImage"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"commentsId"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}}]}}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const AllNewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllNews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AllNews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"group"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"authorImage"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"commentsId"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}}]}}]}}]} as unknown as DocumentNode<AllNewsQuery, AllNewsQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CreateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UserInformationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserInformation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserInformation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UserInformationQuery, UserInformationQueryVariables>;