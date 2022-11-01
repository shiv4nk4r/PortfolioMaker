
                </Group>
                </Box>
                <Box mx="auto">
                  <Title order={1}>Professional Skills</Title>
                  {proffessionalSkillsFields}
                  <Group position="center" mt="md">
                    <Button
                      onClick={() =>
                        form.insertListItem("proffessionalSkills", {
                          title: "",
                          score: 0,
                          key: randomId(),
                        })
                      }
                    >
                      Add Professional Skill
                    </Button>
                  </Group>
                </Box>
              </Stepper.Step>
              <Stepper.Completed>
                Completed, click back button to get to previous step
              </Stepper.Completed>
            </Stepper>
  
            <Group position="center" mt="xl">
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep}>Next step</Button>
            </Group>
          </Container>
        </Center>
      </>
    );
  }
  
  export default editportfolio;