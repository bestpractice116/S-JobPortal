import adobeXd from "/public/img/svg/skills/adobe-xd.svg";
import adobeaudition from "/public/img/svg/skills/adobeaudition.svg";
import afterEffects from "/public/img/svg/skills/after-effects.svg";
import angular from "/public/img/svg/skills/angular.svg";
import aws from "/public/img/svg/skills/aws.svg";
import azure from "/public/img/svg/skills/azure.svg";
import blender from "/public/img/svg/skills/blender.svg";
import bootstrap from "/public/img/svg/skills/bootstrap.svg";
import bulma from "/public/img/svg/skills/bulma.svg";
import c from "/public/img/svg/skills/c.svg";
import canva from "/public/img/svg/skills/canva.svg";
import capacitorjs from "/public/img/svg/skills/capacitorjs.svg";
import coffeescript from "/public/img/svg/skills/coffeescript.svg";
import cplusplus from "/public/img/svg/skills/cplusplus.svg";
import csharp from "/public/img/svg/skills/csharp.svg";
import css from "/public/img/svg/skills/css.svg";
import dart from "/public/img/svg/skills/dart.svg";
import deno from "/public/img/svg/skills/deno.svg";
import django from "/public/img/svg/skills/django.svg";
import docker from "/public/img/svg/skills/docker.svg";
import fastify from "/public/img/svg/skills/fastify.svg";
import figma from "/public/img/svg/skills/figma.svg";
import firebase from "/public/img/svg/skills/firebase.svg";
import flutter from "/public/img/svg/skills/flutter.svg";
import gcp from "/public/img/svg/skills/gcp.svg";
import gimp from "/public/img/svg/skills/gimp.svg";
import git from "/public/img/svg/skills/git.svg";
import go from "/public/img/svg/skills/go.svg";
import graphql from "/public/img/svg/skills/graphql.svg";
import haxe from "/public/img/svg/skills/haxe.svg";
import html from "/public/img/svg/skills/html.svg";
import illustrator from "/public/img/svg/skills/illustrator.svg";
import ionic from "/public/img/svg/skills/ionic.svg";
import java from "/public/img/svg/skills/java.svg";
import javascript from "/public/img/svg/skills/javascript.svg";
import julia from "/public/img/svg/skills/julia.svg";
import kotlin from "/public/img/svg/skills/kotlin.svg";
import lightroom from "/public/img/svg/skills/lightroom.svg";
import markdown from "/public/img/svg/skills/markdown.svg";
import materialui from "/public/img/svg/skills/materialui.svg";
import matlab from "/public/img/svg/skills/matlab.svg";
import memsql from "/public/img/svg/skills/memsql.svg";
import microsoftoffice from "/public/img/svg/skills/microsoftoffice.svg";
import mongoDB from "/public/img/svg/skills/mongoDB.svg";
import mysql from "/public/img/svg/skills/mysql.svg";
import nextJS from "/public/img/svg/skills/nextJS.svg";
import nginx from "/public/img/svg/skills/nginx.svg";
import numpy from "/public/img/svg/skills/numpy.svg";
import nuxtJS from "/public/img/svg/skills/nuxtJS.svg";
import opencv from "/public/img/svg/skills/opencv.svg";
import photoshop from "/public/img/svg/skills/photoshop.svg";
import php from "/public/img/svg/skills/php.svg";
import picsart from "/public/img/svg/skills/picsart.svg";
import postgresql from "/public/img/svg/skills/postgresql.svg";
import premierepro from "/public/img/svg/skills/premierepro.svg";
import python from "/public/img/svg/skills/python.svg";
import pytorch from "/public/img/svg/skills/pytorch.svg";
import react from "/public/img/svg/skills/react.svg";
import ruby from "/public/img/svg/skills/ruby.svg";
import selenium from "/public/img/svg/skills/selenium.svg";
import sketch from "/public/img/svg/skills/sketch.svg";
import strapi from "/public/img/svg/skills/strapi.svg";
import svelte from "/public/img/svg/skills/svelte.svg";
import swift from "/public/img/svg/skills/swift.svg";
import tailwind from "/public/img/svg/skills/tailwind.svg";
import tensorflow from "/public/img/svg/skills/tensorflow.svg";
import typescript from "/public/img/svg/skills/typescript.svg";
import unity from "/public/img/svg/skills/unity.svg";
import vitejs from "/public/img/svg/skills/vitejs.svg";
import vue from "/public/img/svg/skills/vue.svg";
import vuetifyjs from "/public/img/svg/skills/vuetifyjs.svg";
import webix from "/public/img/svg/skills/webix.svg";
import wolframalpha from "/public/img/svg/skills/wolframalpha.svg";
import wordpress from "/public/img/svg/skills/wordpress.svg";
import nodejs from "/public/img/svg/skills/nodejs.svg";
import visualstudiocode from "/public/img/svg/skills/visualstudiocode.svg";
import postman from "/public/img/svg/skills/postman.svg";
import redux from "/public/img/svg/skills/redux.svg";
import expressjs from "/public/img/svg/skills/expressjs.svg";

export const skillsImage = (skill: any) => {
  const skillID = skill.toLowerCase();
  switch (skillID) {
    case "gcp":
      return gcp;
    case "html":
      return html;
    case "photoshop":
      return photoshop;
    case "docker":
      return docker;
    case "illustrator":
      return illustrator;
    case "adobe xd":
      return adobeXd;
    case "after effects":
      return afterEffects;
    case "css":
      return css;
    case "angular":
      return angular;
    case "javascript":
      return javascript;
    case "next js":
      return nextJS;
    case "nuxt js":
      return nuxtJS;
    case "react":
      return react;
    case "svelte":
      return svelte;
    case "typescript":
      return typescript;
    case "vue":
      return vue;
    case "bootstrap":
      return bootstrap;
    case "bulma":
      return bulma;
    case "capacitorjs":
      return capacitorjs;
    case "coffeescript":
      return coffeescript;
    case "memsql":
      return memsql;
    case "mongodb":
      return mongoDB;
    case "mysql":
      return mysql;
    case "postgresql":
      return postgresql;
    case "tailwind":
      return tailwind;
    case "vitejs":
      return vitejs;
    case "vuetifyjs":
      return vuetifyjs;
    case "c":
      return c;
    case "c++":
      return cplusplus;
    case "c#":
      return csharp;
    case "dart":
      return dart;
    case "go":
      return go;
    case "java":
      return java;
    case "kotlin":
      return kotlin;
    case "julia":
      return julia;
    case "matlab":
      return matlab;
    case "php":
      return php;
    case "python":
      return python;
    case "ruby":
      return ruby;
    case "swift":
      return swift;
    case "adobe audition":
      return adobeaudition;
    case "aws":
      return aws;
    case "deno":
      return deno;
    case "django":
      return django;
    case "firebase":
      return firebase;
    case "gimp":
      return gimp;
    case "git":
      return git;
    case "graphql":
      return graphql;
    case "lightroom":
      return lightroom;
    case "materialui":
      return materialui;
    case "nginx":
      return nginx;
    case "numpy":
      return numpy;
    case "opencv":
      return opencv;
    case "premiere":
      return premierepro;
    case "pytorch":
      return pytorch;
    case "selenium":
      return selenium;
    case "strapi":
      return strapi;
    case "tensorflow":
      return tensorflow;
    case "webix":
      return webix;
    case "wordpress":
      return wordpress;
    case "azure":
      return azure;
    case "blender":
      return blender;
    case "fastify":
      return fastify;
    case "figma":
      return figma;
    case "flutter":
      return flutter;
    case "haxe":
      return haxe;
    case "ionic":
      return ionic;
    case "markdown":
      return markdown;
    case "ms office":
      return microsoftoffice;
    case "picsart":
      return picsart;
    case "sketch":
      return sketch;
    case "unity":
      return unity;
    case "wolframalpha":
      return wolframalpha;
    case "canva":
      return canva;
    case "nodejs" || "node.js" || "Node.js":
      return nodejs;
    case "expressjs" || "express.js" || "Express.js":
      return expressjs;
    case "visualstudiocode" || "visual studio code" || "vscode":
      return visualstudiocode;
    case "postman" || "Postman" || "Post man" || "Post Man" || "post man":
      return postman;
    case "redux" || "Redux":
      return redux;
    default:
      break;
  }
};

export const skillsList = [
  "GCP",
  "HTML",
  "Photoshop",
  "Docker",
  "Illustrator",
  "Adobe XD",
  "After Effects",
  "CSS",
  "Angular",
  "JavaScript",
  "Next JS",
  "Nuxt JS",
  "React",
  "Svelte",
  "TypeScript",
  "Vue",
  "Bootstrap",
  "Bulma",
  "CapacitorJS",
  "CoffeeScript",
  "MemSQL",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "Tailwind",
  "ViteJS",
  "VuetifyJS",
  "C",
  "C++",
  "C#",
  "Dart",
  "Go",
  "Java",
  "Kotlin",
  "Julia",
  "Matlab",
  "PHP",
  "Python",
  "Ruby",
  "Swift",
  "Adobe Audition",
  "AWS",
  "Deno",
  "Django",
  "Firebase",
  "GIMP",
  "Git",
  "GraphQL",
  "Lightroom",
  "MaterialUI",
  "Nginx",
  "NumPy",
  "OpenCV",
  "Premiere",
  "PyTorch",
  "Selenium",
  "Strapi",
  "TensorFlow",
  "Webix",
  "WordPress",
  "Azure",
  "Blender",
  "Fastify",
  "Figma",
  "Flutter",
  "Haxe",
  "Ionic",
  "Markdown",
  "MS Office",
  "PicsArt",
  "Sketch",
  "Unity",
  "WolframAlpha",
  "Canva",
  "NodeJS",
  "ExpressJS",
  "VisualStudioCode",
  "Postman",
  "Redux",
];
