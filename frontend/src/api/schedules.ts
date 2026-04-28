import api from './apiClient';

export interface Schedule {
  id: string;
  user_company_id: string | null;
  title: string;
  schedule_type: string | null;
  start_at: string;
  end_at: string | null;
}

export interface UpcomingScheduleItem {
  id: string;
  user_company_id: string | null;
  title: string;
  schedule_type: string | null;
  start_at: string;
  end_at: string | null;
}


type CreateScheduleBody = Pick<Schedule, 'title' | 'start_at'> &
  Partial<Pick<Schedule, 'schedule_type' | 'end_at' | 'user_company_id'>>;

type UpdateScheduleBody = Partial<
  Pick<Schedule, 'title' | 'schedule_type' | 'start_at' | 'end_at' | 'user_company_id'>
>;

export const schedulesApi = {
  getAll: () =>
    api.get<Schedule[]>('/schedules'),

  getUpcoming: (studentId: string) =>
    api.get<UpcomingScheduleItem[]>(`/schedules/upcoming/?studentId=${studentId}`),

  getById: (id: string) =>
    api.get<Schedule>(`/schedules/${id}`),

  create: (body: CreateScheduleBody) =>
    api.post<Schedule>('/schedules', body),

  update: (id: string, body: UpdateScheduleBody) =>
    api.patch<Schedule>(`/schedules/${id}`, body),

  remove: (id: string) =>
    api.delete<void>(`/schedules/${id}`),
};
