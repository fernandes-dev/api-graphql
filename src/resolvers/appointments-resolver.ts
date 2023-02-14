import {Arg, FieldResolver, Mutation, Query, Resolver, Root} from "type-graphql";
import {CreateAppointmentInput} from "../dtos/inputs/create-appointment-input";
import {Appointment} from "../dtos/models/appointment-model";
import {Customer} from "../dtos/models/customer-model";

const appointments: Appointment[] = []
const customers: Customer[] = [{id: 1, name: 'John Doe'}, {id: 2, name: 'Annie Doe'}]

@Resolver(() => Appointment)
export class AppointmentsResolver {
  @Query(() => [Appointment!]!)
  async appointments(@Arg('id', {nullable: true}) id?: number) {
    return id ? appointments.filter(a => a.customerId === id) : appointments
  }

  @Mutation(() => Appointment)
  async createAppointment(@Arg('data', {
    validate: false
  }) data: CreateAppointmentInput) {
    const appointment = {
      startsAt: data.startsAt,
      endsAt: data.endsAt,
      customerId: data.customerId
    }

    appointments.push(appointment)

    return appointment
  }

  @FieldResolver(() => Customer)
  async customer(@Root() appointment: Appointment) {
    return customers.find(c => c.id === appointment.customerId)
  }
}