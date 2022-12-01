import React from 'react'
import { Container, Grid, Header, List } from "semantic-ui-react";
import data from '../../protest_data.json';
import './sidebar.css'


const Sidebar = () => (
  <form className="sidebar">
    <h2 className="sidebar-h2">List of Protests</h2>
    <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header>List</Header>
              <List>
                {data.map(el => {
                  return (
                    <List.Item  key={el.titles}>
                      <List.Content>
                        {el.locations} {el.dates}
                      </List.Content>
                    </List.Item>
                  );
                })}
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
  </form>
)

export default Sidebar