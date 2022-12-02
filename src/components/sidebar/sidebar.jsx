import React from 'react'
import { Container, Grid, List } from "semantic-ui-react";
import data from '../../protest_data.json';
import './sidebar.css'


const Sidebar = () => (
  <form className="sidebar">
    <h2 className="sidebar-h2">List of Protests</h2>
    <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <List>
                {data.map(el => {
                  return (
                    <ul key={el.titles} >
                      <br></br>
                      <List.Content>
                      <strong>{el.titles}</strong> <br></br> <b>{"Where:"}</b> {el.locations} <br></br> <b>{"When:"}</b> {el.dates}
                      </List.Content>
                    </ul>
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