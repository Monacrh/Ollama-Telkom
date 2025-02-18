# Project Ollama Tel-U

Proyek ini masih dalam pengembangan.

## Package yang digunakan

Berikut merupakan package yang digunakan dalam proyek ini:

- **React**
- **Bootstrap**
- **React-Bootstrap**
- **react-icons**
- **eslint**
- **vite**

## Cara menggunakan

Cukup ketik `git clone` proyek ini, kemudian `npm install` untuk menginstall package yang dibutuhkan.

# Peraturan pengembangan proyek

## Konvensi commit

Berikut merupakan aturan commit yang harus dipatuhi supaya sejarah commit dapat dipahami oleh orang lain. Dasar yang digunakan untuk aturan ini dapat diakses pada [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

### Struktur commit

> (type)[optional scope]: (description)
>
> [optional body]
>
> [optional footer(s)]

Commit berisi elemen struktural berikut:

1. **fix**: sebuah commit dengan tipe `fix` menambal (patch) sebuah bug di proyek ini.
2. **feat**: sebuah commit dengan tipe `feat` mengenalkan sebuah fitur baru ke dalam proyek ini.
3. **pkg**: sebuah commit dengan tipe `pkg` mengenalkan package baru pada package.json.
4. **docs**: sebuah commit dengan tipe `docs` mengubah dokumen `README`.
5. **config**: sebuah commit dengan tipe `config` mengubah file-file konfigurasi dalam proyek dan menambah konfigurasi baru.
6. **assets**: sebuah commit dengan tipe `assets` menambahkan aset-aset baru pada folder assets maupun public.
7. **BREAKING CHANGE**: sebuah commit yang memiliki sebuah footer `BREAKING CHANGE:`, atau menambahkan `!` setelah tipe/scope, mengenalkan perubahan yang dapat mengganggu aktifitas pengembangan.

### Contoh commit

**Pesan commit dengan deskripsi dan footer breaking change**

    feat: izinkan objek konfigurasi yang disediakan untuk memperluas konfigurasi lainnya
    
    BREAKING CHANGE: kunci `extends` dalam file konfigurasi sekarang digunakan untuk memperluas file konfigurasi lainnya

**Pesan commit dengan `!` untuk menarik perhatian pada breaking change**

    feat!: kirim email ke pelanggan saat produk dikirim

**Pesan commit dengan scope dan `!` untuk menarik perhatian pada breaking change**

    feat(api)!: kirim email ke pelanggan saat produk dikirim

**Pesan commit dengan `!` dan footer BREAKING CHANGE**

    chore!: hentikan dukungan untuk Node 6

    BREAKING CHANGE: menggunakan fitur JavaScript yang tidak tersedia di Node 6.

**Pesan commit tanpa badan**

    docs: ejaan yang benar dari CHANGELOG

**Pesan commit dengan scope**

    feat(lang): menambahkan bahasa Polandia

**Pesan commit dengan body multi-paragraf dan beberapa footer**

    fix: mencegah racing of requests

    Memperkenalkan id permintaan dan referensi ke permintaan terbaru. Membuang tanggapan yang masuk selain dari permintaan terbaru.
    
    Menghapus batas waktu yang digunakan untuk mengurangi masalah balap tetapi sekarang sudah tidak digunakan lagi.
    
    Reviewed-by: Z
    Refs: #123

### Tambahan mengenai pesan commit

Jika memungkinkan, gunakan Bahasa Indonesia.

Akan tetapi, silahkan saja mencampur Bahasa Inggris dengan Bahasa Indonesia jika ada istilah yang biasa digunakan dalam Bahasa Inggris.

## Konvensi struktur proyek

```
src
--- assets
--- components
------ __tests__
------ [nama komponen 1]
------ [nama komponen 2]
--- context
--- data
--- hooks
--- pages
------ [nama halaman 1]
------ [nama halaman 2]
--- utils
--- App.jsx
--- main.jsx
```

### Penjelasan dari setiap folder

- **assets**: semua gambar, css, font berada di dalam folder ini, pokoknya data yang tidak diolah secara langsung oleh kode.
- **components**: bagian-bagian kode seperti chat sections, group sections berada di folder ini.
- **context**: folder untuk menyimpan file-file berisi context React yang digunakan pada beberapa halaman.
- **data**: mirip seperti assets, tetapi untuk menyimpan aset data seperti JSON yang mengandung informasi yang digunakan di dalam kode. Contohnya global constant variables, store items, theme informations, environment variables.
- **hooks**: menyimpan global hooks yang digunakan pada beberapa halaman.
- **pages**: satu halaman web memiliki satu folder untuk menyimpan filenya. Contoh Home.jsx akan disimpan di pages/Home. Root file untuk setiap halaman juga disimpan di masing-masing halaman. Custom hooks yang khusus digunakan pada satu halaman juga disimpan di folder dimana halaman tersebut berada.
- **utils**: menyimpan semua fungsi-fungsi utilitas yang membantu proyek.

# Tambahan

1. Commit seawal dan secepatnya supaya tidak banyak perubahan yang menumpuk pada satu commit.
2. Tolong buat branch sendiri pada repo lokal untuk mengembangkan fitur, kemudian rebase brnach tersebut ke master/main branch. Setelah itu silahkan di push ke remote repo.
3. Jika sudah push ke remote repository, tolong kabari kolaborator yang lain.
