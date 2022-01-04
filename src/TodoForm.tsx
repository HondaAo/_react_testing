import * as React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Formik, Field, Form } from "formik";
import { GET_TODOS } from "./Todos";

interface Props {}

export const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

export const TodoForm: React.FC<Props> = () => {
  return (
    <Mutation
      mutation={ADD_TODO}
      update={(cache, { data: { addTodo } }) => {
        const { todos } = cache.readQuery({ query: GET_TODOS });
        cache.writeQuery({
          query: GET_TODOS,
          data: { todos: todos.concat([addTodo]) }
        });
      }}
    >
      {(addTodo, { loading }) => (
        <Formik
          initialValues={{ type: "" }}
          onSubmit={values => {
            addTodo({ variables: values });
          }}
        >
          {({ values, errors,handleChange }) => (
            <Form>
              <div>
                <input 
                name="type"
                placeholder="todo..."
                value={values.type}
                onChange={handleChange}
                />
              </div>
              <button disabled={loading} type="submit" data-testid='submit-button'>
                Add Todo
              </button>
            </Form>
          )}
        </Formik>
      )}
    </Mutation>
  );
};
