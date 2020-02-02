import React, { Component } from "react";
import PhoneBook from "./components/PhoneBook";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import { uuid } from "uuidv4";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" }
    ],
    filter: ""
  };

  onAddContacts = (name, number) => {
    const contact = {
      id: uuid(),
      name,
      number
    };
    const contactCheck = this.state.contacts.find(
      contact => contact.name === name
    );
    if (contactCheck) {
      alert("exisits");
      return contact;
    } else {
      this.setState(prevState => {
        return {
          contacts: [...prevState.contacts, contact]
        };
      });
    }
  };

  changeFilter = filter => {
    this.setState({ filter });
  };

  removeContact = contactId => {
    this.setState(prevState => {
      console.log(prevState);
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== contactId)
      };
    });
  };

  visibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const visContacts = this.visibleContacts();
    console.log(this.state);
    return (
      <>
        <PhoneBook onAddContact={this.onAddContacts} />
        <Filter value={filter} filterChange={this.changeFilter} />
        <ContactList contacts={visContacts} onRemove={this.removeContact} />
      </>
    );
  }
}
