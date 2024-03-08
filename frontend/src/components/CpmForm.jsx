import { Header, FormField, Button, Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";

// eslint-disable-next-line react/prop-types
export default function CpmForm({ addRowToTable }) {
  const { register, handleSubmit } = useForm();
  const options = [];

  for (let i = 1; i <= 20; i++) {
    options.push({ key: i, text: i.toString(), value: i });
  }

  function onSubmit(data) {
    addRowToTable(data);
  }

  return (
    <>
      <Header as="h1" textAlign="center">
        Metoda CPM
      </Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <label>Nazwa zdarzenia: </label>
          <input
            placeholder="Nazwa zdarzenia"
            required
            {...register("name", { pattern: { value: /^[a-zA-Z]+$/ } })}
          />
        </FormField>
        <FormField>
          <label>Czas trwania zdarzenia(dni):</label>
          <input
            placeholder="Czas trwania zdarzenia"
            required
            {...register("duration", { pattern: { value: /^\d+$/ } })}
          />
        </FormField>
        <FormField>
          <label>Następstwo OD:</label>
          <input
            placeholder="Następstwo OD"
            required
            {...register("from", { pattern: { value: /^\d+$/ } })}
          />
        </FormField>
        <FormField>
          <label>Następstwo DO:</label>
          <input
            placeholder="Następstwo DO"
            required
            {...register("to", { pattern: { value: /^\d+$/ } })}
          />
        </FormField>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}
