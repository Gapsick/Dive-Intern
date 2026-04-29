export interface SelectionItemDto {
  id: string;
  name_ko: string | null;
  name_ja: string | null;
  industry: string | null;
  region: string | null;
  logo_url: string | null;
  description_ko: string | null;
  description_ja: string | null;
  position_ko: string | null;
  position_ja: string | null;
  tech_stacks: string[];
  status: string | null;
  current_stage_label: string | null;
  match_score: number | null;
  next_event_label: string | null;
  next_event_date: string | null;
}
