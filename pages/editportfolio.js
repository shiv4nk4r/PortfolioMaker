import { useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import {
  Box,
  TextInput,
  Button,
  Switch,
  Group,
  ActionIcon,
  Center,
  Textarea,
  Grid,
  Slider,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Container, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons";
import { Stepper } from "@mantine/core";
import { randomId } from "@mantine/hooks";

function editportfolio() {
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: null,
      linkedin: "",
      portflioURL: "",
      website: "",
      aboutYou: "",
      educations: [
        {
          insitutionName: "",
          degree: "",
          majors: "",
          startYear: "",
          endYear: "",
          isCurrent: false,
          key: randomId(),
        },
      ],
      experiences: [
        {
          organisation: "",
          role: "",
          aboutRole: "",
          startDate: "",
          endDate: "",
          isCurrent: false,
          key: randomId(),
        },
      ],
      projects: [
        {
          title: "",
          description: "",
          link: "",
          key: randomId(),
        },
      ],
      personalSkills: [
        {
          title: "",
          key: randomId(),
        },
      ],
      proffessionalSkills: [
        {
          title: "",
          score: 0,
          key: randomId(),
        },
      ],
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 5 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const personalSkillsFields = form.values.personalSkills.map((item, index) => (
    <Group key={item.key}>
      <TextInput
        label="Title"
        size="lg"
        sx={{ flex: 1 }}
        {...form.getInputProps(`personalSkills.${index}.title`)}
      />
      <ActionIcon
        color="red"
        onClick={() => form.removeListItem("personalSkills", index)}
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Group>
  ));

  const proffessionalSkillsScores = [
    { value: 0, label: "0" },
    { value: 10, label: "1" },
    { value: 20, label: "2" },
    { value: 30, label: "3" },
    { value: 40, label: "4" },
    { value: 50, label: "5" },
    { value: 60, label: "6" },
    { value: 70, label: "7" },
    { value: 80, label: "8" },
    { value: 90, label: "9" },
    { value: 100, label: "10" },
  ];

  const proffessionalSkillsFields = form.values.proffessionalSkills.map(
    (item, index) => (
      <Group key={item.key} noWrap align={"center"}>
        <TextInput
          label="Title"
          size="lg"
          sx={{ flex: 3 }}
          {...form.getInputProps(`proffessionalSkills.${index}.title`)}
        />

        <Slider
          sx={{ flex: 2 }}
          label={(val) =>
            proffessionalSkillsScores.find((mark) => mark.value === val).label
          }
          defaultValue={0}
          step={10}
          min={0}
          max={100}
          marks={proffessionalSkillsScores}
          styles={{ markLabel: { display: "none" } }}
        />
        <ActionIcon
          color="red"
          onClick={() => form.removeListItem("proffessionalSkills", index)}
        >
          <IconTrash size={16} />
        </ActionIcon>
      </Group>
    )
  );

  const projectsFields = form.values.projects.map((item, index) => (
    <Group key={item.key}>
      <TextInput
        label="Title"
        size="lg"
        sx={{ flex: 1 }}
        {...form.getInputProps(`projects.${index}.title`)}
      />
      <TextInput
        label="Description"
        size="lg"
        sx={{ flex: 1 }}
        {...form.getInputProps(`projects.${index}.description`)}
      />
      <TextInput
        label="Link"
        size="lg"
        sx={{ flex: 1 }}
        {...form.getInputProps(`projects.${index}.link`)}
      />
      <ActionIcon
        color="red"
        onClick={() => form.removeListItem("projects", index)}
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Group>
  ));

  const experienceFields = form.values.experiences.map((item, index) => (
    <Group key={item.key}>
      <TextInput
        label="Organisation Name"
        size="lg"
        sx={{ flex: 1 }}
        {...form.getInputProps(`experiences.${index}.organisation`)}
      />
      <TextInput
        label="Role / Title"
        size="lg"
        sx={{ flex: 1 }}
        {...form.getInputProps(`experiences.${index}.role`)}
      />
      <TextInput
        label="About your role/title"
        size="lg"
        sx={{ flex: 1 }}
        {...form.getInputProps(`experiences.${index}.aboutRole`)}
      />
      <DatePicker
        placeholder="End Date"
        label="End date"
        withAsterisk
        {...form.getInputProps(`experiences.${index}.startDate`)}
      />
      <DatePicker
        placeholder="End Date"
        label="End date"
        withAsterisk
        {...form.getInputProps(`experiences.${index}.endDate`)}
      />
      <Switch
        label="Current Position"
        {...form.getInputProps(`experiences.${index}.isCurrent`, {
          type: "checkbox",
        })}
      />
      <ActionIcon
        color="red"
        onClick={() => form.removeListItem("experiences", index)}
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Group>
  ));

  const educationFields = form.values.educations.map((item, index) => (
    <Group key={item.key}>
      <TextInput
        label="Institution Name"
        size="lg"
        sx={{ flex: 1 }}
        {...form.getInputProps(`educations.${index}.insitutionName`)}
      />
      <TextInput
        label="Majors"
        size="lg"
        sx={{ flex: 1 }}
        {...form.getInputProps(`educations.${index}.majors`)}
      />
      <TextInput
        label="Degree"
        size="lg"
        sx={{ flex: 1 }}
        {...form.getInputProps(`educations.${index}.degree`)}
      />
      <DatePicker
        placeholder="Start Date"
        label="Start date"
        withAsterisk
        {...form.getInputProps(`educations.${index}.startYear`)}
      />
      <DatePicker
        placeholder="End Date"
        label="End date"
        withAsterisk
        {...form.getInputProps(`educations.${index}.endYear`)}
      />
      <Switch
        label="Currently Studying Here"
        {...form.getInputProps(`educations.${index}.isCurrent`, {
          type: "checkbox",
        })}
      />
      <ActionIcon
        color="red"
        onClick={() => form.removeListItem("educations", index)}
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Group>
  ));

  return (
    <>
      <HeaderComponent />
      <Center>
        <Container size={"100%"}>
          <Stepper active={active} onStepClick={setActive} breakpoint="sm">
            <Stepper.Step
              label="Personal Details"
              description="Enter Personal Details"
            >
              <Center>
                <Container>
                  <Grid grow gutter="xs">
                    <Grid.Col span={6}>
                      <TextInput label="First Name" size="lg" required />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      {" "}
                      <TextInput label="Last Name" size="lg" required />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <TextInput label="Phone" size="lg" />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <TextInput label="Email" size="lg" required />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <TextInput label="LinkedIn" size="lg" />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <TextInput label="Portfolio" size="lg" />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <TextInput label="Website" size="lg" />
                    </Grid.Col>
                  </Grid>
                </Container>
              </Center>
            </Stepper.Step>
            <Stepper.Step label="About" description="Enter details about you">
              <Container fluid={true} size={"xl"}>
                <Textarea
                  placeholder="About You"
                  label="About You"
                  autosize
                  minRows={5}
                  required
                  size="lg"
                ></Textarea>
              </Container>
            </Stepper.Step>
            <Stepper.Step label="Education" description="Enter Eduation">
              <Box mx="auto">
                {educationFields}

                <Group position="center" mt="md">
                  <Button
                    onClick={() =>
                      form.insertListItem("educations", {
                        insitutionName: "",
                        degree: "",
                        majors: "",
                        startYear: "",
                        endYear: "",
                        isCurrent: false,
                        key: randomId(),
                      })
                    }
                  >
                    Add Education
                  </Button>
                </Group>
              </Box>
            </Stepper.Step>
            <Stepper.Step
              label="Work Experience"
              description="Enter Experience"
            >
              <Box mx="auto">
                {experienceFields}

                <Group position="center" mt="md">
                  <Button
                    onClick={() =>
                      form.insertListItem("experiences", {
                        organisation: "",
                        role: "",
                        aboutRole: "",
                        startDate: "",
                        endDate: "",
                        isCurrent: false,
                        key: randomId(),
                      })
                    }
                  >
                    Add Experience
                  </Button>
                </Group>
              </Box>
            </Stepper.Step>
            <Stepper.Step label="Projects" description="Enter Projects">
              <Box mx="auto">
                {projectsFields}
                <Group position="center" mt="md">
                  <Button
                    onClick={() =>
                      form.insertListItem("projects", {
                        title: "",
                        description: "",
                        link: "",
                        key: randomId(),
                      })
                    }
                  >
                    Add Project
                  </Button>
                </Group>
              </Box>
            </Stepper.Step>
            <Stepper.Step label="Skills" description="Enter skills">
              <Box mx="auto">
                <Title order={1}>Personal Skills</Title>
                {personalSkillsFields}
                <Group position="center" mt="md">
                  <Button
                    onClick={() =>
                      form.insertListItem("personalSkills", {
                        title: "",
                        key: randomId(),
                      })
                    }
                  >
                    Add Personal Skill
                  </Button>
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
