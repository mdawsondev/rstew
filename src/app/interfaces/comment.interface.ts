export interface RedditResponse<T> {
  kind: 'Listing' | 't1' | string;
  data: T;
}

enum FullnameTypes {
  "t1_" = "Comment",
  "t2_" = "Account",
  "t3_" = "Link",
  "t4_" = "Message",
  "t5_" = "Subreddit",
  "t6_" = "Award"
}

export interface Listing {
  after: string;
  before: string;
  children: RedditResponse<Comment>[];
  dist: number;
  geo_filters: string;
  modhash: string;
}

// Any will be replaced, just a scaffold.
export interface Comment {
  all_awardings: any[];
  approved_at_utc: any;
  approved_by: any;
  archived: boolean;
  associated_award: any;
  author: string;
  author_flair_background_color: any;
  author_flair_css_class: any;
  author_flair_richtext: any[]
  author_flair_template_id: any;
  author_flair_text: any;
  author_flair_text_color: any;
  author_flair_type: string;
  author_fullname: string;
  author_is_blocked: boolean;
  author_patreon_flair: boolean;
  author_premium: boolean;
  awarders: any[]
  banned_at_utc: any;
  banned_by: any;
  body: string; // MAIN
  body_html: string; // HTMLSPECCHARS
  can_gild: boolean;
  can_mod_post: boolean;
  collapsed: boolean;
  collapsed_because_crowd_control: any;
  collapsed_reason: any;
  collapsed_reason_code: any;
  comment_type: any;
  controversiality: number;
  created: number;
  created_utc: number;
  distinguished: any;
  downs: number;
  edited: boolean;
  gilded: number;
  gildings: {};
  id: string;
  is_submitter: boolean;
  likes: any;
  link_author: string;
  link_id: string;
  link_permalink: string;
  link_title: string;
  link_url: string;
  locked: boolean;
  mod_note: any;
  mod_reason_by: any;
  mod_reason_title: any;
  mod_reports: any[]
  name: string;
  no_follow: boolean;
  num_comments: number;
  num_reports: any;
  over_18: boolean;
  parent_id: string;
  permalink: string;
  quarantine: boolean;
  removal_reason: any;
  replies: string;
  report_reasons: any;
  saved: boolean;
  score: number
  score_hidden: boolean;
  send_replies: boolean;
  stickied: boolean;
  subreddit: string;
  subreddit_id: string;
  subreddit_name_prefixed: string;
  subreddit_type: string;
  top_awarded_type: any;
  total_awards_received: number;
  treatment_tags: any[]
  unrepliable_reason: any;
  ups: number;
}
