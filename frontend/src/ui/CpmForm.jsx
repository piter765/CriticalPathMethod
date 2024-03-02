import { Header, FormField, Button, Form, Dropdown } from "semantic-ui-react";

export default function CpmForm() {
  const options = [
    { key: 1, text: "Choice 1", value: 1 },
    { key: 2, text: "Choice 2", value: 2 },
    { key: 3, text: "Choice 3", value: 3 },
  ];

  return (
    <>
      <Header as="h1" textAlign="center">
        Metoda CPM
      </Header>
      <Form>
        <FormField>
          <label>Nazwa zdarzenia: </label>
          <input placeholder="Nazwa zdarzenia" />
        </FormField>
        <FormField>
          <label>Czas trwania zdarzenia(dni):</label>
          <Dropdown clearable options={options} selection/>
        </FormField>
        <FormField>
          <label>Następstwo OD:</label>
          <Dropdown clearable options={options} selection/>
        </FormField>
        <FormField>
          <label>Następstwo DO:</label>
          <Dropdown clearable options={options} selection/>
        </FormField>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}
