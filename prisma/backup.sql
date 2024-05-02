--
-- PostgreSQL database dump
--

-- Dumped from database version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: department; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.department (id, title, created_at, updated_at) FROM stdin;
133c633f-43a8-4ef4-9c95-c375d46c09b1	Minecraft	2024-04-20 00:54:57.98657	\N
7d6555d2-cf90-4bad-98a9-9a517ed3a43f	WITHOUT DEPARTMENT	2024-04-29 23:35:58.59	\N
0fdc948a-c36c-41b2-b390-c059082e86e5	LEGAL	2024-04-29 23:35:59.023	\N
65cdbec2-197c-47ef-891a-77275f9d04ba	ACCOUNTING	2024-04-29 23:35:59.256	\N
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.role (id, title, created_at, updated_at) FROM stdin;
814d8c94-7011-4a02-964b-8719bfc6fbf8	NO ROLE	2024-04-29 23:35:56.89	\N
50cc343a-5d33-48a2-a3ff-ab209da29ae3	ADMIN	2024-04-29 23:35:57.41	\N
39863d21-ab7a-464b-973c-cc8680c1aebe	LEGAL	2024-04-29 23:35:57.707	\N
97160c24-a525-482f-b8af-467cb2a27b33	ACCOUNTING	2024-04-29 23:35:57.908	\N
edeb8e0e-caad-4cdb-af6c-d241cd167991	No Role	2024-04-30 00:17:54.002	\N
3b3c97a1-fb22-4511-bc74-e0adf9882cd9	Admin	2024-04-30 00:17:54.37	\N
fe28fdb7-da13-4db8-904b-51eec353621e	Legal	2024-04-30 00:17:54.621	\N
6ce601db-22a4-46ee-8b0f-c2107b304314	Accounting	2024-04-30 00:17:54.911	\N
\.


--
-- Data for Name: employee; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.employee (id, first_name, last_name, email, image_url, created_at, updated_at, id_department, id_role, device_token) FROM stdin;
d66d4595-f930-4510-a59a-c824962a8add	Denisse	Dominguez	denissedb01@gmail.com	https://lh3.googleusercontent.com/a/ACg8ocI826iIybJb2Tkel0M8Yy3iTaGQgVABuZsHUJh0jY77y3u8NKm2qg=s96-c	2024-04-26 22:05:54.745	\N	7d6555d2-cf90-4bad-98a9-9a517ed3a43f	50cc343a-5d33-48a2-a3ff-ab209da29ae3	cV9adDJbDHZa-16WuLLFBm:APA91bFPM1MfekMokz2iaJYrWimrWznfHgVlNCNeITQ5TwuubXH4YqSrCEAsvPfYcIu7cFKkUOPeYQs24BLaacKZMOzpckwpMGcNxKfKYEZKwJd3_hdNOEZ2bDTp27olSVBx_rmoUTWw
96c6d176-f861-45ac-8d00-9cf1e7d73ea9	carlos	salguero	carlossalguero441@gmail.com	https://lh3.googleusercontent.com/a/ACg8ocJk9MtdcScqGf0yB84eFTa1IfQid4k2NczRR_DhvE5X7RZmJF6nzQ=s96-c	2024-04-26 14:12:55.784	\N	7d6555d2-cf90-4bad-98a9-9a517ed3a43f	50cc343a-5d33-48a2-a3ff-ab209da29ae3	\N
0e5be2c8-2583-42d9-8e19-e942957be497	Rodrigo	Terán	rodrigo.teranhernandez@gmail.com	\N	2024-04-27 17:57:25.083287	\N	\N	50cc343a-5d33-48a2-a3ff-ab209da29ae3	\N
4af50510-032e-4c5b-b240-bf28a16dc63a	Arturo Cristián	Díaz López	a01709522@tec.mx	https://lh3.googleusercontent.com/a/ACg8ocIocTg4oQrmmI0dxu_Pin2j0hE9wRgEniTcBK0dj_qGa__0fQ=s96-c	2024-04-29 01:48:31.604	\N	7d6555d2-cf90-4bad-98a9-9a517ed3a43f	50cc343a-5d33-48a2-a3ff-ab209da29ae3	fLuZI27m2YVgXzauD0I4MN:APA91bFu63scnZMZ5Q4kzTQWVDxa4SmmZpuAhiwIlCsdbKA8EnBC13eoQQIK1afm-W9QNqCtJZJj-i-Ui8XMvgicmJSGHlwG6cHgVsVkWirbPWa9v1Fh2FSCrcT9UiOKyRYUkS486WvL
4826c249-224f-4775-939d-f667a8c2e069	José Armando	Rosas Balderas	a01704132@tec.mx	https://lh3.googleusercontent.com/a/ACg8ocKl6qCg7rM4JK6pVj0YgbVv7dNODGc-pLu4tt7ply41YAyQjQ=s96-c	2024-04-26 23:13:48.44	\N	7d6555d2-cf90-4bad-98a9-9a517ed3a43f	50cc343a-5d33-48a2-a3ff-ab209da29ae3	c9u80TnvPWXQz9AEzm7QJ2:APA91bF_PVQ1wkH6InKj5vkuNVqQQ-8R6QmT57_XcInSBl7z1P5Sr1ipBvYNa6YNWyplfAswUeLJOUDBXt3S-ibVxa6tjiMu3GyBpgWOnNQv7CoztPzCCj9kyAlPCLpCACQFW25eam0n
da59a4e4-9644-4778-afd3-6a2cb1b29193	Olimpia Helena	García Huerta	a01708462@tec.mx	https://lh3.googleusercontent.com/a/ACg8ocIbVOQWJ_GQE9RMlt4dV6V3GTjAEMOAtylqSwC3qDDb2Sz_qQ=s96-c	2024-04-30 00:10:47.35	\N	7d6555d2-cf90-4bad-98a9-9a517ed3a43f	50cc343a-5d33-48a2-a3ff-ab209da29ae3	\N
ac18e85e-fa67-49e3-a2ad-9b33c9dec08d	Carlos Rodrigo	Salguero Alcántara	a00833341@tec.mx	https://lh3.googleusercontent.com/a/ACg8ocKAUib-vDSulteT1kEq0mcuTX5AOTdtS3pdXoac4tsoSzRr_E8=s96-c	2024-04-26 13:51:17.835	\N	7d6555d2-cf90-4bad-98a9-9a517ed3a43f	50cc343a-5d33-48a2-a3ff-ab209da29ae3	\N
134330d9-2b12-4be4-bc5c-600a62ecce05	Sebastian	Flores	seb.flores2002@gmail.com	https://lh3.googleusercontent.com/a/ACg8ocKvu_2vbfMrx7BPXARuEwdotpGYCDDjU1WV5bfQbc_bZ4rj9A=s96-c	2024-04-29 01:38:43.416	\N	7d6555d2-cf90-4bad-98a9-9a517ed3a43f	50cc343a-5d33-48a2-a3ff-ab209da29ae3	f2ZVOyf6O3FPyz0aDryK5Q:APA91bHKriWbbau58A1wOxbkWCLEvRgM6EVh3g2yX_1nHcITyEZDvrWmeooS-54_mhf0t4KajZfCt4iytLbTUE1xeJBqd91kYTwOU4shqzQ-ixI1vwZD8wCvBacVMO5wcYrcvehFRQ0Z
82e907e7-c263-4d09-b566-c39060f92d24	Frida	Bailleres González	a01708633@tec.mx	https://lh3.googleusercontent.com/a/ACg8ocJukXrxovGmQohV2Fo7gpwHzWfXZ2MM_Sxxfm3AxW-VxBuIfQo=s96-c	2024-04-29 01:36:20.968	\N	7d6555d2-cf90-4bad-98a9-9a517ed3a43f	50cc343a-5d33-48a2-a3ff-ab209da29ae3	cD465KFxCuGGpdmqiAwSeS:APA91bExcEOZ7Hu3hm4y1TqizWBHcXbe4BudOlGhT72b-DYgR-hOeKoDQQ79a-G88aefAd2XZ8cU-ks_4a9Kl9dY2Sskis3dQPcfx3h2LmjDtlPFFekWrSvIi4k5MiVecKeYYbgg_imG
e8c79cdf-2bab-49ec-984b-66301accccc3	Diego	Perdomo Salcedo	a01709150@tec.mx	https://lh3.googleusercontent.com/a/ACg8ocLf1U5WX5JzMW87gKuYaYhDa3X-MnD034TP3KCJY73PVCzpuA=s96-c	2024-05-01 06:32:56.964	\N	7d6555d2-cf90-4bad-98a9-9a517ed3a43f	50cc343a-5d33-48a2-a3ff-ab209da29ae3	\N
938892e7-8f0f-44e0-bdcb-84c94bd42d3d	Daniel	Hurtado	danielhurtado714@gmail.com	https://lh3.googleusercontent.com/a/ACg8ocKMmJzENA2g7j_rOlKxDMOCu8eOJGhaKPgtU9g7ytjNXmIvOw=s96-c	2024-05-01 00:57:15.194	\N	7d6555d2-cf90-4bad-98a9-9a517ed3a43f	50cc343a-5d33-48a2-a3ff-ab209da29ae3	e1fPsbyTrhA-V74srFdo24:APA91bEShyWQDf6lRxuoKJws7yGbGaUikSi7y0xBW4TH26c_71CLpceJ_E8L3cRgAUwc4NC5sWjbHx5jnpNWRJifrMQUrwxTvn1n63vi2sU8ZBrIw1lDXTwsHGHcWbFe8agXHte_SP_v
b591e9aa-efa9-4523-9c3e-6221aa482b55	Ramona	Nájera Fuentes	a01423596@tec.mx	https://lh3.googleusercontent.com/a/ACg8ocIt7mHvN4WdbbjqTI-xJ4JEnrHNL6AyuXBJWAA-dutyYoHcvQ=s96-c	2024-04-29 00:43:37.32	\N	7d6555d2-cf90-4bad-98a9-9a517ed3a43f	50cc343a-5d33-48a2-a3ff-ab209da29ae3	\N
ebd37616-ebdd-4dc5-8616-521eb5a3c6d2	Ian Joab	Padrón Corona	a01708940@tec.mx	https://lh3.googleusercontent.com/a/ACg8ocJywC9_1P0Sdad_BPG2mfWa8TP1ToE-_xmXzJVLZJgytr6Dvg=s96-c	2024-04-26 17:26:59.488	\N	7d6555d2-cf90-4bad-98a9-9a517ed3a43f	50cc343a-5d33-48a2-a3ff-ab209da29ae3	fUMtW0_j27pIe_b6DUuJ5S:APA91bGKluOTddXfTHyQ1ObasJ6jeMcDDqeGXcaUL2mEUFJHG7Jj7N0BXSxXvuHi2gVvwn8_NFH3bduBz33CSIl4eWOVdu_hnEtTqMRZAodv1zF7sOpfM7KcbM9j-P-9s0M97FV5kCWI
b4c506a6-e5d4-495b-99b9-fcf7c3c760d1	Diego	Perdomo	diegopsop14@gmail.com	https://lh3.googleusercontent.com/a/ACg8ocKBbVLpe6xQWOCflwpqXmOyKqg1LdS9h5PQK8Qqp_eGSZHkzA=s96-c	2024-05-01 06:30:47.185	\N	7d6555d2-cf90-4bad-98a9-9a517ed3a43f	50cc343a-5d33-48a2-a3ff-ab209da29ae3	\N
bfd00557-15bf-42f9-b644-35fe3eabdc7e	Sebastián Armando	Flores Lemus	a01709229@tec.mx	https://lh3.googleusercontent.com/a/ACg8ocJWtlLCGlMzXs1jN_vFaEl44qinzR3OcwEnLM9C_qspeWFmKg=s96-c	2024-04-29 01:35:02.319	\N	7d6555d2-cf90-4bad-98a9-9a517ed3a43f	50cc343a-5d33-48a2-a3ff-ab209da29ae3	f2ZVOyf6O3FPyz0aDryK5Q:APA91bHKriWbbau58A1wOxbkWCLEvRgM6EVh3g2yX_1nHcITyEZDvrWmeooS-54_mhf0t4KajZfCt4iytLbTUE1xeJBqd91kYTwOU4shqzQ-ixI1vwZD8wCvBacVMO5wcYrcvehFRQ0Z
791bc7a4-b380-4ef0-8889-cf11801053d0	Dummy	User	dummy.user@gmail.com	\N	2024-04-27 18:00:53.888266	\N	\N	50cc343a-5d33-48a2-a3ff-ab209da29ae3	\N
56f927ac-56dd-4f0c-83a6-c784ec59bd33	Frida	Bailleres	bailleres.frida@gmail.com	https://lh3.googleusercontent.com/a/ACg8ocKv6a0l5JT6FrnT2YCKATequFdEuwV2qnKmERITXZLfLNJV8Zix=s96-c	2024-05-01 22:06:30.814	\N	7d6555d2-cf90-4bad-98a9-9a517ed3a43f	97160c24-a525-482f-b8af-467cb2a27b33	cD465KFxCuGGpdmqiAwSeS:APA91bExcEOZ7Hu3hm4y1TqizWBHcXbe4BudOlGhT72b-DYgR-hOeKoDQQ79a-G88aefAd2XZ8cU-ks_4a9Kl9dY2Sskis3dQPcfx3h2LmjDtlPFFekWrSvIi4k5MiVecKeYYbgg_imG
df79c220-f604-4a3e-b9b0-73dcd3ec2d28	Sergio	Garnica González	a01704025@tec.mx	https://lh3.googleusercontent.com/a/ACg8ocIRi8F_oKChd7LqVtPcyzLBpJrQstE1i7A0i5dFXZDk1o370Q=s96-c	2024-04-26 07:10:37.369	\N	7d6555d2-cf90-4bad-98a9-9a517ed3a43f	3b3c97a1-fb22-4511-bc74-e0adf9882cd9	\N
\.


--
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.comment (id, message, created_at, updated_at, id_employee) FROM stdin;
\.


--
-- Data for Name: company_direct_contact; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.company_direct_contact (id, first_name, last_name, email, phone_number, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: form; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.form (id, title, email, client_name, applicant_name, phone_num, landline_num, address, passport, company_names, company_type, corporate_purpose, mexican_address, fixed_capital_stock, variable_capital_stock, values_per_share, num_shares_per_shareholder, partner_capital_stock, management_form, general_manager_name, power_attorney_general_manager, special_clause_general_manager, chairman_name, power_attorney_chairman, special_clause_chairman, secretary_board_name, power_attorney_secretary_board, special_clause_secretary_board, names_board_members, supervisory_board_names, power_attorney_zeitgeist_team, special_clause_zeitgeist_team, grant_power_attorney_other, name_attorney_one, power_attorney_one, special_clause_attorney_one, name_attorney_two, power_attorney_two, special_clause_attorney_two, name_attorney_three, power_attorney_three, special_clause_attorney_three, name_attorney_four, power_attorney_four, special_clause_attorney_four, name_attorney_five, power_attorney_five, special_clause_attorney_five, questionnaire_questions, additional_questions, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.company (id, name, email, phone_number, landline_phone, created_at, updated_at, id_company_direct_contact, id_form, archived, constitution_date, rfc, tax_residence) FROM stdin;
72546cec-4075-4427-bce6-d5e2766a6ada	Mojang	carl_manneh@mojang.com	4421234567890	7771234567890	2024-04-20 00:54:57.98657	\N	\N	\N	f	\N	\N	\N
7d58797a-ed02-4dd3-a8b0-a2a4f6880a07	Valve	gabe_newell@valve.com	4421239867890	7771234567230	2024-04-20 00:54:57.98657	\N	\N	\N	f	\N	\N	\N
81ad179e-aa65-4741-9a9e-7f70accb9f99	Apple2	apple@a2pple.com	\N	\N	2024-04-20 18:08:14.758	\N	\N	\N	f	\N	\N	\N
4ed0e0f8-e8c6-436e-b12b-1fa84e8cbf60	Coam	coam@gmail.com	\N	\N	2024-04-20 19:14:42.883	\N	\N	\N	f	\N	\N	\N
58e58fae-0688-430c-aab5-07e058ab2a57	Nite	nite@email.com	\N	\N	2024-04-20 19:17:27.802	\N	\N	\N	f	\N	\N	\N
705812e8-33d7-4200-8616-4f342d83d042	My new company 4	s@s.com	\N	\N	2024-04-21 15:20:46.713	\N	\N	\N	f	\N	\N	\N
48cac651-db12-45d4-a8f2-e6c1faa12091	AWS3	aws3@aws.com	\N	\N	2024-04-21 16:23:08.755	\N	\N	\N	f	\N	\N	\N
7062d25b-9146-456d-9246-59c2e547eb2a	My new company 4	aasa@kdjslf.com	\N	\N	2024-04-21 16:33:31.552	\N	\N	\N	f	\N	\N	\N
4e266e04-7762-42da-9802-1a3bf181beb9	Bell	kg@kg.com	\N	\N	2024-04-22 21:27:17.585	\N	\N	\N	f	\N	\N	\N
75a2a514-8479-42a5-8b06-ea6c4f4085a0	sdfsdfsd	sdfsdf2@lefj.com	\N	\N	2024-04-22 22:31:43.889	\N	\N	\N	f	\N	\N	\N
54cc1003-f3bf-4cc4-905d-11fd255e4f62	Bimbo2	slkdfkljkdf2@kjefskld.com	\N	\N	2024-04-22 22:32:12.048	\N	\N	\N	f	\N	\N	\N
1f68f2bb-f0f9-4dea-a64c-40d4f9c726f7	Bimbo3	sdlkfjlkd@xn--sdkfj-pta.com	\N	\N	2024-04-22 22:35:10.773	\N	\N	\N	f	\N	\N	\N
76992c7e-d0da-4e76-ba81-9ed2d8581e73	Bimbo	bimbo@gmail.com	\N	\N	2024-04-22 22:54:31.91	\N	\N	\N	f	\N	\N	\N
3a691bd3-e7f1-4ed4-b595-14e287e73d9f	Night	denissedb01@gmail.com	\N	\N	2024-04-23 02:23:05.942	\N	\N	\N	f	\N	\N	\N
438e1063-7aa4-43a2-95d6-75ea12ac0a5e	My new company 4	ss@s.com	\N	\N	2024-04-21 15:35:04.128	\N	\N	\N	f	\N	\N	\N
51a8053d-2073-4636-acef-998882b503d1	My new company 4	sss@s.com	\N	\N	2024-04-21 15:35:41.205	\N	\N	\N	f	\N	\N	\N
27722548-52e3-49d3-86b5-3515fe36a7ac	My new company 4	ssss@s.com	\N	\N	2024-04-21 15:36:15.936	\N	\N	\N	f	\N	\N	\N
1a17b52b-cdeb-4005-bd25-5fd204c3746c	sdlkhglq	slkdgf@slkdf.com	\N	\N	2024-04-21 15:54:33.511	\N	\N	\N	f	\N	\N	\N
03c92392-86d5-440c-94e6-20f73cdeaac1	sdlhfgsdkjh	dsjhfkljksd@sljf.com	\N	\N	2024-04-21 15:55:09.965	\N	\N	\N	f	\N	\N	\N
51b960ea-c431-4b34-ad2d-9f65112c6c0e	sdfsdg	adfgafdh@if.com	\N	\N	2024-04-21 15:56:13.457	\N	\N	\N	f	\N	\N	\N
37f2d582-22a5-4519-9afd-2515cdd815a3	sgddsg	sdflkh@slkfd.com	\N	\N	2024-04-21 15:58:38.993	\N	\N	\N	f	\N	\N	\N
68c8728a-4f5f-4ef7-a04f-2f820db42cfc	OPPO	sldhjklf@ldskhf.com	\N	\N	2024-04-21 16:08:11.885	\N	\N	\N	f	\N	\N	\N
389d0e9b-7009-4e3b-8ca9-823e734034c2	My new company 43	rt@kdjslf.com	\N	\N	2024-04-26 07:00:58.564	\N	\N	\N	f	\N	ASDF907856RF3	Epigmenio Gonzalez 123
5f895540-efe0-4064-a291-78b7f078f688	Sergio	sergio@sergio.com	\N	\N	2024-04-26 07:54:05.193	\N	\N	\N	f	\N	sdhflsdkjhfl	Epigmenio Gonzales No. 564
7190ba58-706f-415a-abc1-7e32fa332f97	Emilio	emilio@emilio.com	1234567890	\N	2024-04-26 08:00:50.335	\N	\N	\N	f	\N	sdhflsdkjhfl	Epigmenio Gonzales No. 564
06100a8f-f73e-43b1-a8e4-87461f7defc2	Emilio4	emilio3@emilio.com	1234567890	\N	2024-04-26 08:05:04.423	\N	\N	\N	f	\N	sdhflsdkjhfl	Epigmenio Gonzales No. 564
2cd9dfa2-2875-4993-abea-834cf58644e1	Dell	dell@dell.com	1234567890	\N	2024-04-29 01:23:37.206	\N	\N	\N	f	2024-04-12 00:00:00	qwertyuiopasd	34234234
3ea24e0c-519e-46d8-a45e-62bc5fcbada0	Kellogs	kellogs@gmail.com	21224666	2132132321321	2024-04-19 01:07:39.771	\N	\N	\N	f	2024-04-12 00:00:00	sadsadsadsad	Epigmenio Gonzalez 123
076e827f-82d5-45b3-bae4-d9ebc861d1ef	Bun	bun@gamil.com	4423453476	\N	2024-04-20 19:40:38.845	2024-05-01 21:04:51.595	\N	\N	f	2024-05-01 06:00:00	\N	\N
0d40682a-e318-4395-9cb1-7c6f6eef0c27	AAAA	hola@ssdlkjf.cosma	\N	\N	2024-04-21 16:16:55.996	2024-05-01 21:42:02.106	\N	\N	f	2024-05-01 06:00:00	ROPL951201	\N
6d020306-611e-44ea-8d46-334de5473db2	AWS	aws@aws.com	\N	\N	2024-04-21 16:18:36.932	2024-05-01 21:44:48.021	\N	\N	f	\N	\N	\N
3ede2e49-986e-4243-b2df-c32595bb28a6	Client 1	client1@gmail.com	4424901111	4424901111	2024-04-21 15:55:09.965	\N	\N	\N	f	2024-05-01 06:00:00	ASDF951201	Epigmenio Gonzales No. 564
\.


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.notification (id, title, body, created_at, updated_at) FROM stdin;
92f85cb9-c21d-46fa-85b7-6b09b07126b5	You have been assigned to a task!	Notification body	2024-04-26 18:05:28.236	\N
daa85d34-46b1-42d1-9218-262e2781a9cd	You have been assigned to a task!	Notification body	2024-04-26 18:16:36.694	\N
2c01b991-5a57-468a-a507-2fafd7a78f87	You have been assigned to a task!	Notification body	2024-04-26 18:16:52.392	\N
f5c7e91f-0f26-427f-8cba-82f0ec1f8e47	You have been assigned to a new task. Go check it out!	Notification body	2024-04-26 22:29:05.368	\N
9b896c55-5800-45e8-9636-614036ed00ce	You have been assigned to a new task. Go check it out!	Notification body	2024-04-26 22:29:24.086	\N
\.


--
-- Data for Name: employee_notification; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.employee_notification (id, created_at, updated_at, id_employee, id_notification) FROM stdin;
57eaf1bf-943f-49f3-8dcc-061b7d13fb5f	2024-04-26 18:16:52.52	\N	ebd37616-ebdd-4dc5-8616-521eb5a3c6d2	2c01b991-5a57-468a-a507-2fafd7a78f87
cf902940-80fd-409c-9cc1-9d90bbb9a540	2024-04-26 22:29:24.292	\N	ebd37616-ebdd-4dc5-8616-521eb5a3c6d2	9b896c55-5800-45e8-9636-614036ed00ce
\.


--
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.project (id, name, matter, description, status, category, start_date, end_date, total_hours, periodicity, is_chargeable, created_at, updated_at, id_company, area) FROM stdin;
88031ca2-234d-4b21-9a45-c89e0e3ae754	csgo	Juegos	Proyecto csgo	In quotation	Disparos	0001-01-01	1000-01-01	10.00	Diario	t	2024-04-20 00:54:57.98657	\N	7d58797a-ed02-4dd3-a8b0-a2a4f6880a07	LEGAL
e238f3e6-fc29-4d6c-97b4-a099151244ca	cs2	Juegos	Proyecto cs2	Under revision	Disparos	0001-01-01	1000-01-01	10.00	Diario	t	2024-04-20 00:54:57.98657	\N	7d58797a-ed02-4dd3-a8b0-a2a4f6880a07	LEGAL
eaee8ed1-3527-439d-9396-6600f86ca05c	Nuevo Proyecto de Desarrollo	Desarrollo de un sistema de gesti??n interna	Este proyecto consiste en el desarrollo de un sistema de gesti??n interna para mejorar los procesos administrativos.	In process	Government	2023-04-01	2023-12-01	\N	1 week	t	2024-04-19 01:23:57.016	\N	3ea24e0c-519e-46d8-a45e-62bc5fcbada0	LEGAL
fab10471-1b5c-47a2-8c38-d8f5ac864fbc	Nuevo Proyecto de Desarrollo	Desarrollo de un sistema de gesti??n interna	Este proyecto consiste en el desarrollo de un sistema de gesti??n interna para mejorar los procesos administrativos.	In process	Government	2023-04-01	2023-12-01	\N	1 week	t	2024-04-19 01:23:59.86	\N	3ea24e0c-519e-46d8-a45e-62bc5fcbada0	LEGAL
33c13cf9-2cfc-4ae2-bee5-8391cb5fff4e	A priject	\N	\N	-	Zeitgeist internal	2024-04-23	1970-01-01	10.00	When needed	t	2024-04-23 20:31:40.059	\N	3ea24e0c-519e-46d8-a45e-62bc5fcbada0	LEGAL
532866c6-4b22-48e7-acb2-5d1469c17ebe	A project	Aws	\N	-	Academic connection	2024-04-23	\N	20.00	When needed	t	2024-04-23 20:33:56.469	\N	3ea24e0c-519e-46d8-a45e-62bc5fcbada0	ACCOUNTING
621858ca-8220-4a16-b3b3-6a0ce6e6e0db	Nuevo Proyecto de Desarrollo	Desarrollo de un sistema de gesti??n interna	Este proyecto consiste en el desarrollo de un sistema de gesti??n interna para mejorar los procesos administrativos.	In process	Government	2023-04-01	2023-12-01	\N	1 week	t	2024-04-19 01:23:56.026	\N	3ea24e0c-519e-46d8-a45e-62bc5fcbada0	LEGAL
8487428c-0fd7-447a-b63e-4519d3930de6	Proyecto Expansión 2024	Aws	Proyecto csgo	Not started	Government	1970-01-01	1000-01-01	\N	When needed	f	2024-05-02 04:47:21.609	\N	3ede2e49-986e-4243-b2df-c32595bb28a6	LEGAL
5cb76036-760d-4622-8a54-ec25a872def5	Nuevo Proyecto de Desarrollo	Desarrollo de un sistema de gesti??n interna	Este proyecto consiste en el desarrollo de un sistema de gesti??n interna para mejorar los procesos administrativos.	In process	Government	2023-04-01	2023-12-01	\N	1 week	t	2024-04-19 01:23:57.85	\N	3ea24e0c-519e-46d8-a45e-62bc5fcbada0	LEGAL
9dc482ef-79cd-4866-ae99-02d8a5b25712	Nuevo Proyecto de Desarrollo	Desarrollo de un sistema de gesti??n interna	Este proyecto consiste en el desarrollo de un sistema de gesti??n interna para mejorar los procesos administrativos.	In process	Government	2023-04-01	2023-12-01	\N	1 week	t	2024-04-19 01:23:59.207	\N	3ea24e0c-519e-46d8-a45e-62bc5fcbada0	ACCOUNTING
c7fa96c8-a665-43d8-a728-d70864426392	Nuevo Proyecto de Desarrollo	Desarrollo de un sistema de gesti??n interna	Este proyecto consiste en el desarrollo de un sistema de gesti??n interna para mejorar los procesos administrativos.	In process	Government	2023-04-01	2023-12-01	\N	1 week	t	2024-04-19 01:23:49.555	\N	3ea24e0c-519e-46d8-a45e-62bc5fcbada0	ACCOUNTING
f97c7b3b-b68b-4116-8a3d-d3220c544b2d	Nuevo Proyecto de Desarrollo	Desarrollo de un sistema de gesti??n interna	Este proyecto consiste en el desarrollo de un sistema de gesti??n interna para mejorar los procesos administrativos.	In process	Government	2023-04-01	2023-12-01	\N	1 week	t	2024-04-19 01:23:58.568	\N	3ea24e0c-519e-46d8-a45e-62bc5fcbada0	ACCOUNTING
fb6bde87-5890-4cf7-978b-8daa13f105f7	Minecraft	Games	Minecraft is a game made up of blocks, creatures, and community. You can survive the night or build a work of art – the choice is all yours. 	Accepted	Open world	2014-04-15	2024-04-15	10.00	1 day	t	2024-04-20 00:54:57.98657	\N	72546cec-4075-4427-bce6-d5e2766a6ada	ACCOUNTING
\.


--
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.task (id, title, description, status, waiting_for, start_date, end_date, worked_hours, created_at, updated_at, id_project) FROM stdin;
6fa8e30a-a238-43df-86fd-169442bdab9c	Llaca Task	Connect llaca to llaca	IN PROGRESS	John Doe	2024-04-15	2024-05-14	10.00	2024-04-15 00:00:00	2024-04-19 22:33:03.081	5cb76036-760d-4622-8a54-ec25a872def5
c791d493-2668-4a8f-99d1-2e18c6ba15e2	Llaca Task	Connect llaca to llaca	IN PROGRESS	John Doe	2024-04-15	2024-05-14	10.00	2024-04-15 00:00:00	2024-04-19 23:09:07.027	5cb76036-760d-4622-8a54-ec25a872def5
d02fc100-d0ef-4de6-a2b8-fdf623ded749	Llaca Task	Connect llaca to llaca	IN PROGRESS	John Doe	2024-04-15	2024-05-14	10.00	2024-04-15 00:00:00	2024-04-19 23:19:52.807	5cb76036-760d-4622-8a54-ec25a872def5
e48f9fdb-ecb4-4d59-8fd7-3cc155f47640	SAT Appointment for ABC Company	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	Client	2024-04-15	2024-05-14	10.00	2024-04-15 00:00:00	2024-04-19 23:27:09.942	5cb76036-760d-4622-8a54-ec25a872def5
a1b5f989-1cdc-4903-b021-606c524e5385	SAT Appointment for ABC Company	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	Client	2024-04-15	2024-05-14	10.00	2024-04-19 23:33:26.231	2024-04-19 23:33:27.025	5cb76036-760d-4622-8a54-ec25a872def5
abb543e1-0ac1-4fee-996d-ce5e4549f48b	SAT appointment for Alex	Register new SAT appointment for Alex	IN PROGRESS	Team	2024-04-19	2024-04-30	40.00	2024-04-19 23:38:25.892	2024-04-19 23:38:26.663	5cb76036-760d-4622-8a54-ec25a872def5
a5f69422-dc18-4cfc-884a-65d5ede93851	SAT Appointment for ABC Company	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	Client	2024-04-15	2024-05-14	10.00	2024-04-20 00:18:13.785	2024-04-20 00:18:14.584	5cb76036-760d-4622-8a54-ec25a872def5
ccc910d5-0537-4fb7-b8af-6570e7917e97	SERGIO	SERGIO	DELAYED	Vendor	2024-04-05	2024-04-09	1.00	2024-04-20 00:34:34.531	2024-04-20 00:34:35.307	5cb76036-760d-4622-8a54-ec25a872def5
b3369d59-3928-49a2-a402-77da9bd7ef58	SERGIO	SERGIO	DELAYED	Vendor	2024-04-05	2024-04-09	1.00	2024-04-20 00:34:35.66	2024-04-20 00:34:35.786	5cb76036-760d-4622-8a54-ec25a872def5
8f95a586-3235-4e59-8757-ce9a48b7b19f	Dummy Task	Dummy description	UNDER REVISSION	Team	2024-04-16	2024-04-11	5.00	2024-04-20 00:38:03.383	2024-04-20 00:38:03.565	5cb76036-760d-4622-8a54-ec25a872def5
445d7c5f-19d3-4441-bf46-5dc3f2066727	SERGE	SERGE	UNDER REVISSION	Team	2024-04-12	2024-04-04	1.00	2024-04-20 00:42:15.564	2024-04-20 00:42:15.745	5cb76036-760d-4622-8a54-ec25a872def5
4b517cfb-88eb-4f39-a9d0-4b4d4e90cd8a	DUMMY	DUMMY	DELAYED	Client	2024-04-02	2024-04-30	0.00	2024-04-20 00:46:51.903	2024-04-20 00:46:52.627	5cb76036-760d-4622-8a54-ec25a872def5
1e7de06a-081a-4933-a69a-b0aa846c3e58	Nuevo mapa	Crear nuevo mapa	Postponed	Pablo	2003-01-01	2004-01-01	106.00	2024-04-20 00:54:57.98657	\N	e238f3e6-fc29-4d6c-97b4-a099151244ca
7c5dfc18-870e-4307-bfd6-daee84ee259b	Nuevo kit de musica	Seleccionar nuevo kit de musica	In progress	Manuel	2005-01-01	2006-01-01	106.00	2024-04-20 00:54:57.98657	\N	e238f3e6-fc29-4d6c-97b4-a099151244ca
be55ff7f-345e-4949-a127-13075b89f568	Nueva arma	Agregar una nueva arma	Done	Maria	2003-01-01	2004-01-01	170.00	2024-04-20 00:54:57.98657	\N	e238f3e6-fc29-4d6c-97b4-a099151244ca
2ff32ef3-3d66-4cab-b5b7-a53f29e1a1be	ABC Company SAT Registry	Reeschedule new appointment for ABC Company at SAT at Qro Center.	POSTPONED	Client	2024-04-22	2024-04-30	0.00	2024-04-22 21:08:39.299	2024-04-22 21:08:39.515	5cb76036-760d-4622-8a54-ec25a872def5
99594540-149f-478a-b332-4d984f16c5da	ABC Company SAT Registry	Reeschedule new appointment for ABC Company at SAT at Qro Center.	POSTPONED	Client	2024-04-22	2024-04-30	120.00	2024-04-22 21:08:57.097	2024-04-22 21:08:57.237	5cb76036-760d-4622-8a54-ec25a872def5
63d417be-2f51-4f43-9d48-6687a57d3def	SAT Appointment for ABC Company	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	Client	2024-04-15	2024-05-14	10.00	2024-04-22 23:08:04.6	2024-04-22 23:08:05.625	5cb76036-760d-4622-8a54-ec25a872def5
a646b56e-a0cb-4946-ac57-896e6d4cedd5	SAT Appointment for ABC Company	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	Client	2024-04-15	2024-05-14	10.00	2024-04-26 17:51:34.052	2024-04-26 17:51:34.341	5cb76036-760d-4622-8a54-ec25a872def5
8d020c72-fc16-49a6-8d87-3ab37a90da34	SAT Appointment for ABC Company	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	Client	2024-04-15	2024-05-14	10.00	2024-04-26 17:53:16.517	2024-04-26 17:53:17.168	5cb76036-760d-4622-8a54-ec25a872def5
dbd67151-6147-478f-afa6-c041e59a2f8f	SAT Appointment for ABC Company	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	Client	2024-04-15	2024-05-14	10.00	2024-04-26 17:55:31.926	2024-04-26 17:55:32.128	5cb76036-760d-4622-8a54-ec25a872def5
cbc475ca-e4cc-49f8-8a57-3de50d7210d4	SAT Appointment for ABC Company 1	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	Client	2024-04-15	2024-05-14	10.00	2024-04-26 17:57:45.612	2024-04-26 17:57:46.251	5cb76036-760d-4622-8a54-ec25a872def5
d866067f-fdbc-43b8-8671-1bd2301b1528	SAT Appointment for ABC Company 1	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	Client	2024-04-15	2024-05-14	10.00	2024-04-26 18:00:10.615	2024-04-26 18:00:11.263	5cb76036-760d-4622-8a54-ec25a872def5
f28d14cc-c518-4418-b591-725eacc0b3b8	SAT Appointment for ABC Company 1	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	Client	2024-04-15	2024-05-14	10.00	2024-04-26 18:01:34.566	2024-04-26 18:01:35.215	5cb76036-760d-4622-8a54-ec25a872def5
ad2d0196-34f7-4ead-8bda-fabc898e14df	SAT Appointment for ABC Company 1	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	Client	2024-04-15	2024-05-14	10.00	2024-04-26 18:05:27.333	2024-04-26 18:05:28.03	5cb76036-760d-4622-8a54-ec25a872def5
7d802a88-ee1e-443a-a83a-ca48faab82ee	SAT Appointment for ABC Company 1	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	Client	2024-04-15	2024-05-14	10.00	2024-04-26 18:16:35.868	2024-04-26 18:16:36.499	5cb76036-760d-4622-8a54-ec25a872def5
b52306b1-8d7c-4184-b3e3-baaef56b462b	SAT Appointment for ABC Company 1	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	Ian Joab	2024-04-15	2024-05-14	10.00	2024-04-26 18:16:52.072	2024-04-26 18:16:52.262	5cb76036-760d-4622-8a54-ec25a872def5
87f1babd-2fb4-441b-81a3-1e4b9cbd76d5	SAT Appointment for ABC Company	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	Client	2024-04-15	2024-05-14	10.00	2024-04-26 22:27:20.172	2024-04-26 22:27:21.031	5cb76036-760d-4622-8a54-ec25a872def5
869c134d-d961-44f0-9606-36cecf252b04	SAT Appointment for ABC Company	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	Client	2024-04-15	2024-05-14	10.00	2024-04-26 22:29:04.428	2024-04-26 22:29:05.044	5cb76036-760d-4622-8a54-ec25a872def5
445564de-0f44-4634-afc1-40190242792c	SAT Appointment for ABC Company	ABC Company needs a new permit for hiring foreign workers aaaaaaaaaaaaaaaa	NOT STARTED	Ian Joab	2024-04-29	2024-04-30	30.00	2024-04-26 22:29:22.764	2024-04-30 06:12:33.112	5cb76036-760d-4622-8a54-ec25a872def5
110ee535-d20b-4301-b160-d0ca375b13a1	SAT Appointment for ABC Company	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	\N	2024-04-15	2024-05-14	10.00	2024-04-27 16:37:39.759	\N	5cb76036-760d-4622-8a54-ec25a872def5
e15acb57-9827-4fcb-8083-8e3063e8f89c	SAT Appointment for ABC Company	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	\N	2024-04-15	2024-05-14	10.00	2024-04-27 16:40:12.965	\N	5cb76036-760d-4622-8a54-ec25a872def5
37baa935-35d0-4f37-9c23-ebfabbbbf8ae	SAT Appointment for ABC Company	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	\N	2024-04-15	2024-05-14	10.00	2024-04-27 16:41:20.037	2024-04-27 16:41:20.752	5cb76036-760d-4622-8a54-ec25a872def5
c91a9954-3e28-4e8d-be48-1d46a103d775	SAT Appointment for ABC Company	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	\N	2024-04-15	2024-05-14	10.00	2024-04-27 16:41:33.732	2024-04-27 16:41:34.44	5cb76036-760d-4622-8a54-ec25a872def5
24c50250-c9e1-440d-99ae-6f7704744e0a	End update	The End is a dark dimension and as its name says it is the final dimension since this is the home of the Enderdragon, the final boss of the game, also of the Endermans and the shulkers.	DONE	Ian	2005-01-01	2006-01-01	160.00	2024-04-20 00:54:57.98657	\N	fb6bde87-5890-4cf7-978b-8daa13f105f7
10349fe3-373a-4402-9cd1-939d68c03622	SAT Appointment for ABC Company	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	\N	2024-04-15	2024-05-14	10.00	2024-04-27 16:41:50.139	2024-04-27 16:41:50.848	5cb76036-760d-4622-8a54-ec25a872def5
bdcf29cd-946a-45d2-bbb6-6a816886d08b	SAT Appointment for ABC Company	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	\N	2024-04-15	2024-05-14	10.00	2024-04-27 16:42:08.17	2024-04-27 16:42:08.868	5cb76036-760d-4622-8a54-ec25a872def5
ab5a8833-f8a5-43d7-818a-d17618ec9a53	SAT Appointment for ABC Company	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	\N	2024-04-15	2024-05-14	10.00	2024-04-28 23:28:15.833	2024-04-28 23:28:16.036	5cb76036-760d-4622-8a54-ec25a872def5
e01b1156-a8f2-4ec3-9588-415f0a0c91bd	SAT Appointment for ABC Company	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	\N	2024-04-15	2024-05-14	10.00	2024-04-28 23:28:46.925	2024-04-28 23:28:46.996	5cb76036-760d-4622-8a54-ec25a872def5
71f30cf6-2e3d-4ad7-b4d3-70dbd6e10878	SAT Appointment for ABC Company	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	\N	2024-04-15	2024-05-14	10.00	2024-04-28 23:29:33.777	2024-04-28 23:29:33.845	5cb76036-760d-4622-8a54-ec25a872def5
dfae43ff-373d-45de-8c39-8b89b92c1e0f	SAT Appointment for ABC Company	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	\N	2024-04-15	2024-05-14	10.00	2024-04-28 23:29:59.032	2024-04-28 23:29:59.106	5cb76036-760d-4622-8a54-ec25a872def5
ea1a9604-a6c4-40c0-90f6-75338275a66d	SAT Appointment for ABC Company	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	\N	2024-04-15	2024-05-14	10.00	2024-04-29 01:22:37.053	2024-04-29 01:22:37.124	5cb76036-760d-4622-8a54-ec25a872def5
4e48ad28-df19-4fe6-8459-0ffaeffdd433	SAT Appointment for ABC Company	ABC Company needs a new permit for hiring foreign workers	IN PROGRESS	\N	2024-04-15	2024-05-14	10.00	2024-04-29 01:23:35.956	2024-04-29 01:23:36.028	5cb76036-760d-4622-8a54-ec25a872def5
61c21833-1791-4822-981a-bb9caf60edc6	Dummy	dummy	IN PROGRESS	\N	2024-04-05	2024-04-25	0.00	2024-04-29 01:24:01.858	2024-04-29 01:24:01.926	5cb76036-760d-4622-8a54-ec25a872def5
8b0d4c4e-7262-4b4f-8003-6d9a060559b3	Dummy	Dummy	IN PROGRESS	\N	2024-04-01	2024-04-08	0.00	2024-04-29 01:32:52.847	2024-04-29 01:32:52.977	5cb76036-760d-4622-8a54-ec25a872def5
97de33b4-707e-40dd-a351-3b2aaba356f5	Dummy	Dummy	IN PROGRESS	\N	2024-04-01	2024-04-08	0.00	2024-04-29 01:32:56.717	2024-04-29 01:32:56.853	5cb76036-760d-4622-8a54-ec25a872def5
0489fd62-a36b-44df-b8ce-c57845bda1bc	Dummy	Dummy	IN PROGRESS	\N	2024-04-01	2024-04-08	0.00	2024-04-29 01:37:10.126	2024-04-29 01:37:10.266	5cb76036-760d-4622-8a54-ec25a872def5
1ac384ff-5fb6-4d84-bf3c-dd9613a8d5fc	Skeleton6	Minecraft Skeleton 3	IN PROGRESS	Ian Joab	2024-04-15	2024-05-14	10.00	2024-04-28 23:33:58.204	2024-04-30 07:09:32.551	fb6bde87-5890-4cf7-978b-8daa13f105f7
2e40e03d-416a-458a-a3c3-08e9664a8b01	New Task	New Task Blablabla	NOT STARTED	\N	2024-04-29	2024-04-30	10.00	2024-04-30 06:15:30.235	2024-04-30 06:15:30.376	5cb76036-760d-4622-8a54-ec25a872def5
c65e46f1-2013-4d5e-9315-2fc3973fa658	New Task	New Task Blablabla	NOT STARTED	\N	2024-04-29	2024-04-30	10.00	2024-04-30 06:15:36.634	2024-04-30 06:15:36.767	5cb76036-760d-4622-8a54-ec25a872def5
f03851bd-2e00-4a84-bbc6-bd224d66a6cf	New Task	New Task Blablabla	NOT STARTED	\N	2024-04-29	2024-04-30	10.00	2024-04-30 06:15:37.152	2024-04-30 06:15:37.294	5cb76036-760d-4622-8a54-ec25a872def5
cd6ec341-b3fd-4fcb-a46c-7e3a376134db	New Task	New Task Blablabla	NOT STARTED	\N	2024-04-29	2024-04-30	10.00	2024-04-30 06:15:37.298	2024-04-30 06:15:37.426	5cb76036-760d-4622-8a54-ec25a872def5
8d61c338-a9f0-4b29-855e-b61bfc97f25a	New Task	New Task Blablabla	NOT STARTED	\N	2024-04-29	2024-04-30	10.00	2024-04-30 06:15:37.464	2024-04-30 06:15:37.592	5cb76036-760d-4622-8a54-ec25a872def5
737c583f-ca92-498a-9ca0-c21e05f11e79	New Task	New Task Blablabla	NOT STARTED	\N	2024-04-29	2024-04-30	10.00	2024-04-30 06:15:37.964	2024-04-30 06:15:38.157	5cb76036-760d-4622-8a54-ec25a872def5
1ab565d8-d239-42ff-9736-2a7a4314522e	New Task	ASFAS;ADSA;'SDASDADA	NOT STARTED	\N	2024-04-29	2024-04-30	10.00	2024-04-30 06:16:54.13	2024-04-30 06:16:54.258	5cb76036-760d-4622-8a54-ec25a872def5
87ab71e4-0661-45a3-a6c8-b452eb87633c	asdasdasda	asdasdasdasdasd	NOT STARTED	\N	2024-04-29	2024-04-30	10.00	2024-04-30 06:18:23.322	2024-04-30 06:18:23.513	5cb76036-760d-4622-8a54-ec25a872def5
83d3a325-0e0a-41af-9b91-89e5c2ef0049	Make a mob farm	For gaining XP	IN PROGRESS	\N	2024-04-29	2024-04-30	4.00	2024-04-30 06:26:47.155	2024-04-30 06:26:47.357	5cb76036-760d-4622-8a54-ec25a872def5
\.


--
-- Data for Name: employee_task; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.employee_task (id, created_at, updated_at, id_employee, id_task) FROM stdin;
f79b2d83-065f-4ac8-8042-717a1cd4f45b	2024-04-28 23:29:59.473	\N	b591e9aa-efa9-4523-9c3e-6221aa482b55	dfae43ff-373d-45de-8c39-8b89b92c1e0f
55b6f57a-83a1-4407-bfba-808acf3d2599	2024-04-29 01:22:37.476	\N	ac18e85e-fa67-49e3-a2ad-9b33c9dec08d	ea1a9604-a6c4-40c0-90f6-75338275a66d
326eccee-0d2d-4675-a647-7a150fb91c1a	2024-04-29 01:23:36.375	\N	ac18e85e-fa67-49e3-a2ad-9b33c9dec08d	4e48ad28-df19-4fe6-8459-0ffaeffdd433
c4b13883-347e-4497-9afb-c5e330765ce9	2024-04-29 01:32:53.18	\N	791bc7a4-b380-4ef0-8889-cf11801053d0	8b0d4c4e-7262-4b4f-8003-6d9a060559b3
7b50df93-c5c4-46a5-b7be-503b450e9afa	2024-04-29 01:32:57.046	\N	791bc7a4-b380-4ef0-8889-cf11801053d0	97de33b4-707e-40dd-a351-3b2aaba356f5
eac4169f-6d6e-4b82-bcd9-c697d7298121	2024-04-29 01:37:10.469	\N	791bc7a4-b380-4ef0-8889-cf11801053d0	0489fd62-a36b-44df-b8ce-c57845bda1bc
beccc163-e8f1-49a8-abe6-fbea351f5c43	2024-04-29 21:58:14.936562	\N	ac18e85e-fa67-49e3-a2ad-9b33c9dec08d	1ac384ff-5fb6-4d84-bf3c-dd9613a8d5fc
2bd5329f-6893-492d-8cc6-7dc6a6c5bcdc	2024-04-30 06:15:30.718	\N	4af50510-032e-4c5b-b240-bf28a16dc63a	2e40e03d-416a-458a-a3c3-08e9664a8b01
afeb8a96-381d-484e-93a5-e434f2e31a16	2024-04-30 06:15:36.974	\N	4af50510-032e-4c5b-b240-bf28a16dc63a	c65e46f1-2013-4d5e-9315-2fc3973fa658
4ab57780-0e62-4f6d-9f20-ae6fc39173b9	2024-04-30 06:15:37.635	\N	4af50510-032e-4c5b-b240-bf28a16dc63a	f03851bd-2e00-4a84-bbc6-bd224d66a6cf
c37d3592-7b1e-4f0d-a08a-b51500978136	2024-04-30 06:15:37.791	\N	4af50510-032e-4c5b-b240-bf28a16dc63a	8d61c338-a9f0-4b29-855e-b61bfc97f25a
9f4fb8c8-6cfe-4616-849c-a4da53cc177d	2024-04-30 06:15:37.746	\N	4af50510-032e-4c5b-b240-bf28a16dc63a	cd6ec341-b3fd-4fcb-a46c-7e3a376134db
74d05dc5-727a-4d53-8580-3b2f45493c2d	2024-04-30 06:15:38.471	\N	4af50510-032e-4c5b-b240-bf28a16dc63a	737c583f-ca92-498a-9ca0-c21e05f11e79
6b9c5305-ab03-404e-9db9-7077f2be2f71	2024-04-30 06:16:54.45	\N	4af50510-032e-4c5b-b240-bf28a16dc63a	1ab565d8-d239-42ff-9736-2a7a4314522e
e8c7e234-482b-4e3e-9d9b-15f1e9f00079	2024-04-30 06:18:23.831	\N	4af50510-032e-4c5b-b240-bf28a16dc63a	87ab71e4-0661-45a3-a6c8-b452eb87633c
da6b2535-87c8-47f6-9284-cae4d67b09a9	2024-04-30 07:09:05.923	\N	ebd37616-ebdd-4dc5-8616-521eb5a3c6d2	1ac384ff-5fb6-4d84-bf3c-dd9613a8d5fc
\.


--
-- Data for Name: expense_report; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.expense_report (id, description, start_date, end_date, status, total_amount, created_at, updated_at, id_employee) FROM stdin;
\.


--
-- Data for Name: file; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.file (id, description, format, url, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: expense; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.expense (id, title, justification, total_amount, status, category, date, created_at, updated_at, id_report, id_file) FROM stdin;
\.


--
-- PostgreSQL database dump complete
--

