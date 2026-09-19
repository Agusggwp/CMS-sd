<?php

namespace Database\Seeders;

use App\Models\Achievement;
use App\Models\Announcement;
use App\Models\Document;
use App\Models\Event;
use App\Models\Facility;
use App\Models\Gallery;
use App\Models\GalleryImage;
use App\Models\Menu;
use App\Models\News;
use App\Models\NewsCategory;
use App\Models\Page;
use App\Models\PPDB;
use App\Models\SchoolSetting;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@sdpercontohan.sch.id'],
            [
                'name' => 'Administrator Sekolah',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'avatar' => null,
            ]
        );

        // 2. School Settings
        $settings = [
            'school_name' => 'SD Negeri Lebak Bulus 07 Pagi',
            'school_npsn' => '20106207',
            'school_accreditation' => 'A (Unggul)',
            'school_slogan' => 'Membentuk Generasi Cerdas, Berkarakter, dan Berakhlak Mulia',
            'school_description' => 'SD Negeri Lebak Bulus 07 Pagi berkomitmen menyelenggarakan pendidikan dasar berkualitas tinggi dengan memadukan kurikulum nasional merdeka belajar, pembiasaan karakter luhur, dan penguasaan literasi digital sejak dini.',
            'school_address' => 'Jl. Lebak Bulus III No. 07, Cilandak, Jakarta Selatan, DKI Jakarta',
            'school_phone' => '021-7693104',
            'school_email' => 'sdn.lebakbulus.07.pg@gmail.com',
            'school_whatsapp' => '081234567890',
            'school_maps' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.8!2d106.78!3d-6.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTgnMDAuMCJTIDEwNsKwNDcnMDAuMCJF!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid',
            
            // Social Media
            'social_facebook' => 'https://facebook.com',
            'social_instagram' => 'https://instagram.com',
            'social_youtube' => 'https://youtube.com',
            'social_twitter' => 'https://twitter.com',
            'social_tiktok' => 'https://tiktok.com',

            // Principal
            'principal_name' => 'Dra. Hj. Sri Wahyuni, M.Pd.',
            'principal_nip' => '19680512 199203 2 004',
            'principal_title' => 'Kepala Sekolah SD Negeri Percontohan',
            'principal_speech' => 'Assalamu’alaikum Warahmatullahi Wabarakatuh, Salam Sejahtera, Om Swastiastu, Namo Buddhaya, Salam Kebajikan. Selamat datang di portal resmi SD Negeri Percontohan. Kami percaya bahwa setiap anak dilahirkan unik dengan potensi emas masing-masing. Di sekolah ini, kami tidak hanya mengasah kecerdasan akademis, melainkan juga menanamkan akhlak mulia, kemandirian, gotong royong, serta kecintaan terhadap ilmu pengetahuan dan budaya bangsa. Bersama para pendidik yang berdedikasi dan didukung fasilitas modern, kami siap membimbing putra-putri Anda menyongsong masa depan yang gemilang.',
            'principal_photo' => null,

            // Stats
            'stat_students' => '520+',
            'stat_teachers' => '36',
            'stat_years' => '25',
            'stat_achievements' => '48',

            // Vision & Mission
            'vision' => 'Terwujudnya peserta didik yang beriman dan bertakwa, cerdas bernalar kritis, unggul dalam prestasi, serta berwawasan lingkungan dan global.',
            'mission' => "1. Menumbuhkan penghayatan dan pengamalan nilai-nilai keagamaan dalam kehidupan sehari-hari.\n2. Melaksanakan pembelajaran yang inovatif, interaktif, dan berpusat pada peserta didik (Student-Centered Learning).\n3. Mengembangkan potensi bakat, minat, dan kreativitas siswa di bidang akademik, seni, dan olahraga.\n4. Membiasakan budaya literasi, numerasi, dan pengenalan teknologi informasi ramah anak.\n5. Mewujudkan lingkungan sekolah yang asri, aman, nyaman, dan berbudaya lingkungan sehat.",
            
            // Meta & SEO
            'meta_title' => 'SD Negeri Percontohan - Sekolah Dasar Unggulan Berkarakter',
            'meta_description' => 'Website Resmi SD Negeri Percontohan. Informasi PPDB, Berita Sekolah, Prestasi, Kegiatan Siswa, Tenaga Pendidik, dan Fasilitas Pendidikan Modern.',
            'meta_keywords' => 'SD Negeri Percontohan, Sekolah Dasar Terbaik, PPDB SD 2026, Sekolah Penggerak',
        ];

        foreach ($settings as $key => $val) {
            SchoolSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $val, 'group' => 'general']
            );
        }

        // 3. News Categories
        $catAkademik = NewsCategory::firstOrCreate(
            ['slug' => 'akademik'],
            ['name' => 'Akademik', 'description' => 'Seputar kegiatan belajar mengajar dan kurikulum']
        );
        $catKegiatan = NewsCategory::firstOrCreate(
            ['slug' => 'kegiatan-siswa'],
            ['name' => 'Kegiatan Siswa', 'description' => 'Aktivitas ekstrakurikuler, lomba, dan kreativitas siswa']
        );
        $catPrestasi = NewsCategory::firstOrCreate(
            ['slug' => 'prestasi'],
            ['name' => 'Prestasi', 'description' => 'Pencapaian membanggakan siswa dan sekolah']
        );

        // 4. News Articles
        $newsData = [
            [
                'title' => 'Peringatan Hari Pendidikan Nasional 2026: Semangat Belajar Merdeka',
                'category_id' => $catKegiatan->id,
                'excerpt' => 'SD Negeri Percontohan memperingati Hardiknas dengan upacara khidmat berbusana adat Nusantara dan pameran karya cipta siswa.',
                'content' => '<p>Pada hari ini, segenap keluarga besar SD Negeri Percontohan menggelar upacara peringatan Hari Pendidikan Nasional dengan penuh suka cita. Seluruh guru dan peserta didik mengenakan busana tradisional dari berbagai penjuru Nusantara sebagai simbol kebhinekaan.</p><p>Acara dilanjutkan dengan karnaval budaya dan pameran proyek P5 (Projek Penguatan Profil Pelajar Pancasila). Karya daur ulang, hidroponik, dan robotika sederhana karya siswa kelas 4 hingga 6 sukses memukau para orang tua dan tamu undangan yang hadir.</p><p>Kepala Sekolah dalam pidatonya menegaskan pentingnya menumbuhkan rasa ingin tahu dan kemerdekaan berpikir anak tanpa membebani mental mereka dengan hafalan monoton semata.</p>',
                'status' => 'published',
                'views' => 245,
                'published_at' => now()->subDays(2),
            ],
            [
                'title' => 'Siswa SD Percontohan Raih Medali Emas Olimpiade Sains Tingkat Provinsi',
                'category_id' => $catPrestasi->id,
                'excerpt' => 'Ananda Rizky Pratama dari kelas 5B berhasil menyabet medali emas dalam kompetisi OSN bidang Ilmu Pengetahuan Alam.',
                'content' => '<p>Kabar membanggakan kembali datang dari ajang Olimpiade Sains Nasional (OSN) tingkat Provinsi DKI Jakarta. Ananda Rizky Pratama, siswa kelas 5B, berhasil mempersembahkan Medali Emas untuk kategori IPA Sekolah Dasar.</p><p>Persiapan intensif selama tiga bulan bersama pembina olimpiade sekolah membuahkan hasil manis. Rizky unggul dalam sesi eksperimen sains lingkungan dan analisis data praktikum. Selanjutnya, Rizky akan mewakili provinsi ke tingkat nasional pada bulan Oktober mendatang.</p><p>Pihak sekolah mengapresiasi tinggi dedikasi ananda serta dukungan penuh dari orang tua dan dewan guru.</p>',
                'status' => 'published',
                'views' => 412,
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Peluncuran Perpustakaan Digital “Pojok Literasi Pintar”',
                'category_id' => $catAkademik->id,
                'excerpt' => 'Meningkatkan minat baca generasi digital dengan koleksi lebih dari 2.000 e-book interaktif dan tablet ramah anak.',
                'content' => '<p>Menjawab tantangan era digitalisasi, SD Negeri Percontohan meresmikan layanan Perpustakaan Digital "Pojok Literasi Pintar". Fasilitas ini dilengkapi dengan 20 unit tablet ramah anak dengan filter konten edukatif dan akses ke 2.000+ judul buku cerita, ensiklopedia anak, dan majalah sains anak.</p><p>Sistem peminjaman buku fisik kini juga terintegrasi barcode kartu pelajar, memudahkan siswa meminjam buku favorit mereka secara mandiri.</p>',
                'status' => 'published',
                'views' => 189,
                'published_at' => now()->subDays(9),
            ],
            [
                'title' => 'Kegiatan Perkemahan Jumat-Sabtu (Perjusa) Pramuka Penggalang',
                'category_id' => $catKegiatan->id,
                'excerpt' => 'Melatih kemandirian, kepemimpinan, dan kerja sama regu melalui kegiatan perkemahan ceria di bumi perkemahan sekolah.',
                'content' => '<p>Kegiatan Perkemahan Jumat-Sabtu (Perjusa) Gugus Depan 01.123 pangkalan SD Negeri Percontohan berlangsung meriah. Diikuti oleh seluruh siswa kelas 5 dan 6, kegiatan ini diisi dengan latihan tali-temali, sandi morse, penjelajahan halang rintang ceria, dan malam api unggun serta pentas seni budaya.</p><p>Melalui kepramukaan, siswa diajarkan nilai Dasa Darma dalam aksi nyata, seperti tolong-menolong, hidup hemat, dan mencintai lingkungan sekitar.</p>',
                'status' => 'published',
                'views' => 320,
                'published_at' => now()->subDays(14),
            ],
            [
                'title' => 'Sosialisasi Program Makan Siang Bergizi Sehat dan Higienis',
                'category_id' => $catAkademik->id,
                'excerpt' => 'Bekerja sama dengan Puskesmas setempat, sekolah memberikan edukasi gizi seimbang "Isi Piringku" kepada seluruh peserta didik.',
                'content' => '<p>Kesehatan fisik adalah fondasi utama konsentrasi belajar. Hari ini sekolah menyelenggarakan penyuluhan gizi seimbang bersama tim dokter anak Puskesmas Kebon Jeruk. Siswa diajarkan mengenali porsi karbohidrat, protein hewani, sayur-mayur segar, serta pentingnya mengurangi jajan manis berkadar gula tinggi.</p><p>Sekolah juga menyediakan tempat cuci tangan berair mengalir dengan sabun antiseptik di depan setiap ruang kelas untuk membiasakan Pola Hidup Bersih dan Sehat (PHBS).</p>',
                'status' => 'published',
                'views' => 156,
                'published_at' => now()->subDays(20),
            ],
        ];

        foreach ($newsData as $n) {
            News::updateOrCreate(
                ['slug' => Str::slug($n['title'])],
                array_merge($n, [
                    'user_id' => $admin->id,
                    'slug' => Str::slug($n['title']),
                ])
            );
        }

        // 5. Announcements
        $announcements = [
            [
                'title' => 'Pemberitahuan Libur Bersama Hari Raya dan Cuti Semester',
                'content' => 'Diberitahukan kepada seluruh Bapak/Ibu Orang Tua/Wali Murid bahwa kegiatan pembelajaran semester ganjil akan diliburkan mulai tanggal 22 Desember hingga 5 Januari. Pembelajaran aktif kembali dimulai pada Senin, 6 Januari. Selama libur mohon tetap mendampingi ananda belajar membaca dan menjaga kesehatan.',
                'is_active' => true,
                'start_date' => now()->subDays(5)->toDateString(),
                'end_date' => now()->addDays(20)->toDateString(),
            ],
            [
                'title' => 'Jadwal Penilaian Tengah Semester (PTS) Genap Tahun Ajaran 2025/2026',
                'content' => 'Pelaksanaan Penilaian Tengah Semester Genap akan dilaksanakan mulai hari Senin s.d. Jumat, pukul 07.30 - 11.00 WIB. Kartu peserta ujian telah dibagikan melalui wali kelas masing-masing. Harap siswa hadir 15 menit sebelum bel masuk berbunyi.',
                'is_active' => true,
                'start_date' => now()->subDays(2)->toDateString(),
                'end_date' => now()->addDays(10)->toDateString(),
            ],
            [
                'title' => 'Pelaksanaan Imunisasi BIAS (Bulan Imunisasi Anak Sekolah)',
                'content' => 'Bekerja sama dengan Dinas Kesehatan DKI Jakarta, akan diadakan pemeriksaan kesehatan gigi dan imunisasi lanjutan bagi siswa kelas 1 dan kelas 2. Formulir persetujuan orang tua telah dikirimkan via lembar konfirmasi siswa.',
                'is_active' => true,
                'start_date' => now()->subDays(1)->toDateString(),
                'end_date' => now()->addDays(15)->toDateString(),
            ],
        ];

        foreach ($announcements as $ann) {
            Announcement::updateOrCreate(
                ['slug' => Str::slug($ann['title'])],
                array_merge($ann, ['slug' => Str::slug($ann['title'])])
            );
        }

        // 6. Events / Agenda
        $events = [
            [
                'title' => 'Upacara Hari Pahlawan & Lomba Paduan Suara Lagu Kebangsaan',
                'description' => 'Upacara bendera bendera peringatan Hari Pahlawan dilanjutkan kompetisi vokal grup antarkelas menyanyikan lagu-lagu nasional.',
                'location' => 'Lapangan Utama Sekolah',
                'start_date' => now()->addDays(4)->setTime(7, 30),
                'end_date' => now()->addDays(4)->setTime(12, 00),
            ],
            [
                'title' => 'Pertemuan Parenting & Pengambilan Rapor Siswa Semester',
                'description' => 'Konsultasi perkembangan belajar murid antara orang tua siswa dengan wali kelas dan pembagian laporan capaian kompetensi.',
                'location' => 'Ruang Kelas Masing-Masing',
                'start_date' => now()->addDays(10)->setTime(8, 00),
                'end_date' => now()->addDays(10)->setTime(14, 00),
            ],
            [
                'title' => 'Pentas Seni & Bazar Kreativitas Siswa Ceria',
                'description' => 'Ajang pertunjukan tari tradisional, drama musikal anak, puisi, serta stan makanan sehat olahan murid dan komite sekolah.',
                'location' => 'Aula Serbaguna Graha Widya',
                'start_date' => now()->addDays(18)->setTime(8, 30),
                'end_date' => now()->addDays(18)->setTime(15, 00),
            ],
            [
                'title' => 'Kunjungan Edukatif Museum Nasional & Planetarium',
                'description' => 'Study tour siswa kelas 4 dan 5 dalam rangka pembelajaran sejarah dan tata surya secara langsung di wahana edukasi.',
                'location' => 'Museum Nasional Jakarta',
                'start_date' => now()->addDays(25)->setTime(7, 00),
                'end_date' => now()->addDays(25)->setTime(16, 00),
            ],
            [
                'title' => 'Lomba Senam Irama Sehat Antar Gugus Sekolah Dasar',
                'description' => 'Perlombaan kebugaran jasmani yang diikuti oleh perwakilan 12 sekolah dasar se-Kecamatan Kebon Jeruk.',
                'location' => 'Gedung Olahraga Remaja (GOR)',
                'start_date' => now()->addDays(32)->setTime(8, 00),
                'end_date' => now()->addDays(32)->setTime(13, 00),
            ],
        ];

        foreach ($events as $ev) {
            Event::updateOrCreate(
                ['slug' => Str::slug($ev['title'])],
                array_merge($ev, ['slug' => Str::slug($ev['title'])])
            );
        }

        // 7. Teachers & Staff (10 Personil)
        $teachers = [
            [
                'name' => 'Dra. Hj. Sri Wahyuni, M.Pd.',
                'nip' => '19680512 199203 2 004',
                'position' => 'Kepala Sekolah',
                'subject' => 'Manajemen Pendidikan',
                'bio' => 'Berpengalaman lebih dari 30 tahun di dunia pendidikan dasar. Pembina Sekolah Penggerak DKI Jakarta.',
                'order' => 1,
            ],
            [
                'name' => 'Bambang Sudibyo, S.Pd., M.Si.',
                'nip' => '19750314 199802 1 002',
                'position' => 'Wakil Kepala Sekolah Bidang Kurikulum',
                'subject' => 'Matematika & Sains',
                'bio' => 'Pengembang metode belajar berhitung cepat dan logika nalar untuk tingkat sekolah dasar.',
                'order' => 2,
            ],
            [
                'name' => 'Siti Nurhaliza, S.Pd.',
                'nip' => '19830921 200604 2 011',
                'position' => 'Wali Kelas 1A',
                'subject' => 'Tematik Kelas 1',
                'bio' => 'Spesialis metode fonik membaca menyenangkan dan transisi PAUD ke SD yang menyenangkan.',
                'order' => 3,
            ],
            [
                'name' => 'Agus Priyanto, S.Pd.',
                'nip' => '19871105 201001 1 015',
                'position' => 'Wali Kelas 2B',
                'subject' => 'Tematik Kelas 2',
                'bio' => 'Instruktur pramuka siaga dan pelatih pembiasaan karakter disiplin mandiri.',
                'order' => 4,
            ],
            [
                'name' => 'Dewi Lestari, S.Pd.',
                'nip' => '19900218 201402 2 008',
                'position' => 'Wali Kelas 3A',
                'subject' => 'Tematik Kelas 3 & Seni Budaya',
                'bio' => 'Guru berprestasi tingkat kota. Pembina sanggar tari kreasi anak sekolah.',
                'order' => 5,
            ],
            [
                'name' => 'Ahmad Fauzi, S.Pd.I.',
                'nip' => '19850619 200903 1 007',
                'position' => 'Guru Pendidikan Agama Islam',
                'subject' => 'PAI & Budi Pekerti',
                'bio' => 'Pembina tilawah Al-Qur’an dan ekstrakurikuler marawis / qasidah.',
                'order' => 6,
            ],
            [
                'name' => 'Hendro Santoso, S.Pd.Kor.',
                'nip' => '19890412 201201 1 003',
                'position' => 'Guru PJOK',
                'subject' => 'Pendidikan Jasmani & Olahraga',
                'bio' => 'Mantan atlet renang daerah. Pelatih ekstrakurikuler bulutangkis dan futsal anak.',
                'order' => 7,
            ],
            [
                'name' => 'Maria Kristina, S.Pd.',
                'nip' => '19920830 201602 2 006',
                'position' => 'Guru Bahasa Inggris',
                'subject' => 'English for Young Learners',
                'bio' => 'Metode pembelajaran bilingual interaktif dengan permainan peran dan storytelling.',
                'order' => 8,
            ],
            [
                'name' => 'I Made Sujana, S.Kom.',
                'nip' => '19940115 201903 1 009',
                'position' => 'Guru TIK & Laboran Komputer',
                'subject' => 'Informatika & Literasi Digital',
                'bio' => 'Mengajarkan dasar coding anak (Scratch) dan etika keamanan berselancar internet.',
                'order' => 9,
            ],
            [
                'name' => 'Ratna Juwita, S.Sos.',
                'nip' => '19930704 201801 2 005',
                'position' => 'Kepala Tata Usaha & Layanan Siswa',
                'subject' => 'Administrasi & Kesiswaan',
                'bio' => 'Mengelola arsip induk siswa, administrasi beasiswa PIP, dan layanan informasi publik.',
                'order' => 10,
            ],
        ];

        foreach ($teachers as $t) {
            Teacher::updateOrCreate(
                ['name' => $t['name']],
                $t
            );
        }

        // 8. Galleries & Images
        $albums = [
            [
                'title' => 'Upacara Hari Pramuka & Api Unggun Ceria',
                'description' => 'Dokumentasi kegiatan kepramukaan, pawai obor, dan unjuk bakat siswa siaga dan penggalang.',
            ],
            [
                'title' => 'Gelar Karya Projek P5: Gaya Hidup Berkelanjutan',
                'description' => 'Pameran hasil karya seni daur ulang sampah plastik, taman hidroponik mini, dan presentasi sains.',
            ],
            [
                'title' => 'Lomba Futsal & Atletik Cilik Antar SD se-Jakarta',
                'description' => 'Momen seru pertandingan olahraga persahabatan memupuk sportivitas dan kebersamaan.',
            ],
        ];

        foreach ($albums as $idx => $alb) {
            $gallery = Gallery::updateOrCreate(
                ['slug' => Str::slug($alb['title'])],
                [
                    'title' => $alb['title'],
                    'slug' => Str::slug($alb['title']),
                    'description' => $alb['description'],
                    'cover_image' => null,
                ]
            );

            // Create sample image records
            for ($i = 1; $i <= 3; $i++) {
                GalleryImage::firstOrCreate(
                    [
                        'gallery_id' => $gallery->id,
                        'order' => $i,
                    ],
                    [
                        'image' => "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
                        'caption' => "Foto dokumentasi kegiatan #{$i} di {$alb['title']}",
                    ]
                );
            }
        }

        // 9. Achievements (5 Prestasi)
        $achievements = [
            [
                'title' => 'Juara 1 Olimpiade Sains Nasional (OSN) Bidang IPA',
                'category' => 'Akademik',
                'level' => 'Tingkat Provinsi DKI Jakarta',
                'year' => '2026',
                'rank' => 'Juara I (Medali Emas)',
                'participant' => 'Rizky Pratama (Kelas 5B)',
                'description' => 'Berhasil memecahkan soal eksperimen biologi mikroorganisme dengan nilai sempurna.',
            ],
            [
                'title' => 'Juara 2 Lomba Tari Kreasi Nusantara FLS2N',
                'category' => 'Seni & Budaya',
                'level' => 'Tingkat Kota Jakarta Barat',
                'year' => '2025',
                'rank' => 'Juara II (Medali Perak)',
                'participant' => 'Tim Tari Melati (6 Siswi)',
                'description' => 'Membawakan tari kreasi perpaduan Saman dan Betawi dengan koreografi memukau.',
            ],
            [
                'title' => 'Juara 1 Turnamen Futsal Usia Dini Pelajar',
                'category' => 'Olahraga',
                'level' => 'Tingkat Kecamatan Kebon Jeruk',
                'year' => '2025',
                'rank' => 'Juara I (Piala Bergilir)',
                'participant' => 'Tim Futsal Putra SD Percontohan',
                'description' => 'Tak terkalahkan di 5 pertandingan dan mencetak rekor tanpa kebobolan.',
            ],
            [
                'title' => 'Juara 1 Lomba Story Telling Bahasa Inggris',
                'category' => 'Bahasa & Literasi',
                'level' => 'Tingkat Kota Administrasi',
                'year' => '2025',
                'rank' => 'Juara I',
                'participant' => 'Clarissa Amanda (Kelas 6A)',
                'description' => 'Membawakan cerita rakyat "The Legend of Danau Toba" dengan artikulasi intonasi mengesankan.',
            ],
            [
                'title' => 'Sekolah Adiwiyata Tingkat Mandiri',
                'category' => 'Lingkungan Hidup',
                'level' => 'Tingkat Nasional',
                'year' => '2024',
                'rank' => 'Penghargaan Utama',
                'participant' => 'Keluarga Besar SD Negeri Percontohan',
                'description' => 'Apresiasi dari Kementerian LHK atas dedikasi pengelolaan sekolah berbudaya ramah lingkungan hijau.',
            ],
        ];

        foreach ($achievements as $ach) {
            Achievement::updateOrCreate(
                ['title' => $ach['title']],
                $ach
            );
        }

        // 10. Facilities (6 Fasilitas)
        $facilities = [
            [
                'name' => 'Perpustakaan Digital Ramah Anak',
                'description' => 'Dilengkapi AC, sofa baca santai, 5.000+ judul buku fisik dan 20 tablet e-library untuk literasi siswa.',
                'icon' => 'BookOpen',
            ],
            [
                'name' => 'Laboratorium Komputer & Multimedia',
                'description' => '32 unit PC modern dengan koneksi internet serat optik berkecepatan tinggi dan filter konten ramah anak.',
                'icon' => 'Monitor',
            ],
            [
                'name' => 'Lapangan Olahraga Multifungsi',
                'description' => 'Lapangan berstandar nasional untuk basket, futsal, voli, senam pagi, serta upacara bendera.',
                'icon' => 'Trophy',
            ],
            [
                'name' => 'UKS Siaga Sehat & Ruang Konseling',
                'description' => 'Fasilitas pertolongan pertama lengkap dengan ranjang pasien, oksigen medis, dan tenaga medis terlatih.',
                'icon' => 'HeartPulse',
            ],
            [
                'name' => 'Musholla As-Salam',
                'description' => 'Tempat ibadah bersih dan nyaman untuk pembiasaan sholat dhuha, sholat zhuhur berjamaah, dan tahfidz juz 30.',
                'icon' => 'Compass',
            ],
            [
                'name' => 'Kebun Edukasi Hidroponik & Sains',
                'description' => 'Wahana luar ruangan tempat siswa belajar bertanam sayuran hijau, daur ulang organik, dan ekosistem mini.',
                'icon' => 'Trees',
            ],
        ];

        foreach ($facilities as $fac) {
            Facility::updateOrCreate(
                ['name' => $fac['name']],
                $fac
            );
        }

        // 11. PPDB
        PPDB::updateOrCreate(
            ['academic_year' => '2026/2027'],
            [
                'title' => 'Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027',
                'academic_year' => '2026/2027',
                'description' => '<p>Selamat datang calon peserta didik dan orang tua hebat! SD Negeri Percontohan membuka pintu seluas-luasnya bagi calon siswa baru kelas 1 tahun ajaran 2026/2027. Kami mengedepankan proses seleksi yang transparan, adil, ramah anak, dan bebas dari tes membaca-menulis-berhitung (Calistung) yang memberatkan.</p>',
                'requirements' => "1. Berusia minimal 6 tahun pada 1 Juli 2026 (prioritas usia 7 tahun ke atas).\n2. Memiliki Akta Kelahiran resmi (asli & fotokopi 2 lembar).\n3. Memiliki Kartu Keluarga (KK) yang diterbitkan paling lambat 1 tahun sebelum tanggal pendaftaran.\n4. Fotokopi KTP kedua orang tua/wali murid.\n5. Pas foto formal calon siswa ukuran 3x4 berwarna (3 lembar latar merah).\n6. Surat keterangan ijazah PAUD/TK (opsional/jika ada).\n7. Mengisi formulir pendaftaran daring atau luring di loket PPDB sekolah.",
                'schedule' => "• Pendaftaran & Verifikasi Berkas: 2 Mei - 20 Mei 2026\n• Pemetaan Kesiapan & Observasi Ramah Anak: 22 - 25 Mei 2026\n• Pengumuman Hasil Seleksi Resmi: 28 Mei 2026 (Pukul 09.00 WIB)\n• Daftar Ulang Peserta Diterima: 30 Mei - 5 Juni 2026\n• Masa Pengenalan Lingkungan Sekolah (MPLS): 13 - 15 Juli 2026",
                'contact_info' => 'Sekretariat PPDB: Gedung A Lantai 1, Ruang Layanan Informasi. Telepon: (021) 567-8901 atau WhatsApp Panitia PPDB: 0812-3456-7890 (Senin - Jumat, 08.00 - 14.00 WIB).',
                'registration_link' => 'https://ppdb.sdpercontohan.sch.id',
                'is_active' => true,
            ]
        );

        // 12. Documents (5 Dokumen)
        $documents = [
            [
                'title' => 'Kalender Pendidikan SD Negeri Percontohan TA 2025/2026',
                'file' => 'documents/kalender_pendidikan.pdf',
                'type' => 'PDF',
                'size' => '1.8 MB',
                'download_count' => 142,
                'description' => 'Jadwal hari efektif belajar, libur nasional, perkiraan PTS, PAS, dan pembagian buku rapor.',
            ],
            [
                'title' => 'Buku Panduan & Tata Tertib Siswa Baru',
                'file' => 'documents/tata_tertib_sekolah.pdf',
                'type' => 'PDF',
                'size' => '2.4 MB',
                'download_count' => 98,
                'description' => 'Pedoman etika, seragam harian, kedisiplinan, dan hak serta kewajiban peserta didik.',
            ],
            [
                'title' => 'Formulir Pendaftaran Siswa Baru (PPDB Offline)',
                'file' => 'documents/formulir_ppdb_2026.pdf',
                'type' => 'PDF',
                'size' => '650 KB',
                'download_count' => 310,
                'description' => 'Formulir cetak isian data biodata siswa, orang tua, dan dokumen syarat administrasi.',
            ],
            [
                'title' => 'Kurikulum Operasional Satuan Pendidikan (KOSP)',
                'file' => 'documents/kosp_kurikulum_merdeka.pdf',
                'type' => 'PDF',
                'size' => '3.5 MB',
                'download_count' => 64,
                'description' => 'Dokumen implementasi Kurikulum Merdeka Belajar dan modul ajar penguatan karakter profil Pancasila.',
            ],
            [
                'title' => 'Panduan Program Ekstrakurikuler Pilihan Siswa',
                'file' => 'documents/ekstrakurikuler_panduan.pdf',
                'type' => 'PDF',
                'size' => '1.2 MB',
                'download_count' => 88,
                'description' => 'Daftar 12 cabang ekstrakurikuler seni, olahraga, sains, dan jadwal pembinaan mingguan.',
            ],
        ];

        foreach ($documents as $doc) {
            Document::updateOrCreate(
                ['title' => $doc['title']],
                $doc
            );
        }

        // 13. Pages (Tentang Sekolah, Visi & Misi)
        Page::updateOrCreate(
            ['slug' => 'tentang-kami'],
            [
                'title' => 'Tentang SD Negeri Percontohan',
                'slug' => 'tentang-kami',
                'content' => '<p>SD Negeri Percontohan didirikan pada tahun 2001 dengan cita-cita luhur menghadirkan sekolah dasar negeri berstandar unggul yang dapat diakses oleh seluruh lapisan masyarakat tanpa diskriminasi.</p><p>Selama lebih dari dua dekade, sekolah ini telah mendidik ribuan alumni berprestasi yang kini melanjutkan studi di jenjang terbaik dan berkontribusi positif bagi bangsa. Kami menerapkan pendekatan pendidikan holistik yang menyeimbangkan antara kecerdasan intelektual (IQ), emosional (EQ), dan spiritual (SQ).</p>',
                'meta_title' => 'Profil Lengkap SD Negeri Percontohan',
                'meta_description' => 'Sejarah berdirinya, budaya belajar, dan dedikasi SD Negeri Percontohan dalam memajukan mutu pendidikan dasar Indonesia.',
                'is_published' => true,
            ]
        );

        // 14. Menus (Navigation Header)
        $menus = [
            ['label' => 'Beranda', 'url' => '/', 'order' => 1],
            ['label' => 'Profil', 'url' => '/tentang', 'order' => 2],
            ['label' => 'Visi & Misi', 'url' => '/visi-misi', 'order' => 3],
            ['label' => 'Guru & Staf', 'url' => '/guru', 'order' => 4],
            ['label' => 'Berita', 'url' => '/berita', 'order' => 5],
            ['label' => 'Pengumuman', 'url' => '/pengumuman', 'order' => 6],
            ['label' => 'Agenda', 'url' => '/agenda', 'order' => 7],
            ['label' => 'Prestasi', 'url' => '/prestasi', 'order' => 8],
            ['label' => 'Fasilitas', 'url' => '/fasilitas', 'order' => 9],
            ['label' => 'Galeri', 'url' => '/galeri', 'order' => 10],
            ['label' => 'PPDB', 'url' => '/ppdb', 'order' => 11],
            ['label' => 'Dokumen', 'url' => '/dokumen', 'order' => 12],
            ['label' => 'Kontak', 'url' => '/kontak', 'order' => 13],
        ];

        foreach ($menus as $m) {
            Menu::updateOrCreate(
                ['label' => $m['label'], 'location' => 'header'],
                array_merge($m, ['location' => 'header', 'is_active' => true])
            );
        }
    }
}
