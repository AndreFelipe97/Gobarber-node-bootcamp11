import { startOfHour } from "date-fns";

import Appointment from "../models/Appointments";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import { fromString } from "uuidv4";

interface RequestAppointmentService {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: RequestAppointmentService): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw Error("This appoinment is already booked!");
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
