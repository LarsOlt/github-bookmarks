import styled from 'styled-components'
import {Form, Field} from 'react-final-form'

export function Header () {
  const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    box-shadow: 0 0 5px gray;
    padding: 2em;
  `

  return (
    <Header>
      <Form onSubmit={(e) => { console.log(e) }}>
        {({handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            <Field name='search' component='input' placeholder='Search...' />
          </form>
        )}
      </Form>
      {/* <form onSubmit={onFormSubmit}>
        <input value={searchInput} onChange={setSearchInput} placeholder='Search...' />
      </form> */}
      <h5>Github Bookmarks</h5>
    </Header>
  )
}
